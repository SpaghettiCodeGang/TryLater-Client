import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import os from 'os'
import net from 'net'
import {sassTrue} from "sass";

const isLinux = os.platform() === 'linux'
const backendHost = isLinux ? 'http://172.17.0.1' : 'http://host.docker.internal'
const backendPort = 8080

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

export default defineConfig(async () => {
  const backendAvailable = await checkBackendReachable(backendHost, backendPort)
  console.log(`🔌 Backend erreichbar: ${backendAvailable}`)

  return {
    plugins: [react()],
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
