
import './App.css'
import "./responsive.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ROUTES from './Router/router'


const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
