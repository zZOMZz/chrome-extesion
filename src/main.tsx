import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const shadowHost = document.getElementById("shadow-host")

const shadowRoot = shadowHost?.shadowRoot
console.log('shadow-root', shadowRoot);

const root = shadowRoot?.getElementById('react-drawer-root')
// const root = document.getElementById("root")
// console.log('react-drawer-root', root);

createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
