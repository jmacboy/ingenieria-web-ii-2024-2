import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListaPersonas from './ListaPersonas.jsx';
import FormPersona from './FormPersona.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/personas",
    element: <ListaPersonas />
  },
  {
    path: "/personas/create",
    element: <FormPersona />
  },
  {
    path: "/personas/:id",
    element: <FormPersona />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
