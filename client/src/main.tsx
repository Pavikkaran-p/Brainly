import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Providers from './config/Providers.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Providers>,
)
