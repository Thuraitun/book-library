import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import Router from './router'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  </AuthContextProvider>
)
