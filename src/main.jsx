import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Landing from './components/landing/lanfing.jsx'
import Sol from './components/main/sol.jsx'
import Eth from './components/main/eth.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "eth",
    element: <Eth />
  },

  {
    path: "sol",
    element: <Sol />
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
</StrictMode>,
)
