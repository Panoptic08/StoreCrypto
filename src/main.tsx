import {  Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Header from "./components/landing.tsx"
import Content from './components/content.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />
  },
  {
    path: "content",
    element: <Content/>
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RouterProvider router={router} />
   
  </StrictMode>,
)
