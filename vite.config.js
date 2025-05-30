import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import os from 'os'
import net from 'net'
import {sassTrue} from "sass";

export default defineConfig(async () => {
  const backendHost = await findReachableBackend(hostOptions, backendPort)
  const backendAvailable = !!backendHost
  console.log(`🔌 Backend erreichbar: ${backendAvailable}`)

  return {
    plugins: [react(), svgr()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      ...(backendAvailable && {
        proxy: {
          '/api': {
            target: `${backendHost}:${backendPort}`,
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    }
  }
})

// The following is required to set up a platform-independent proxy to the Spring backend
const isLinux = os.platform() === 'linux'
const hostOptions = isLinux
    ? ['http://172.17.0.1', 'http://localhost']
    : ['http://host.docker.internal', 'http://localhost']
const backendPort = 8080

async function findReachableBackend(hosts, port) {
  for (const host of hosts) {
    const reachable = await checkBackendReachable(host, port)
    if (reachable) return host
  }
  return null
}

function checkBackendReachable(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    socket.setTimeout(300)
    socket.on('connect', () => {
      socket.destroy()
      resolve(true)
    }).on('error', () => {
      resolve(false)
    }).on('timeout', () => {
      socket.destroy()
      resolve(false)
    }).connect(port, host.replace(/^https?:\/\//, ''))
  })
}