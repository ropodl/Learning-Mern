import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import NotificationProvider from './context/Notification.jsx'
import ThemeProvider from "./context/ThemeProvider.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <NotificationProvider>
    <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
    </React.StrictMode>
      </NotificationProvider>
  </BrowserRouter>
)
