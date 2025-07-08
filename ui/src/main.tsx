import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LoginManager } from './components/Login/LoginManager/LoginManager.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginManager>
      <App />
    </LoginManager>
  </StrictMode>,
)
