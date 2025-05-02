import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
)
