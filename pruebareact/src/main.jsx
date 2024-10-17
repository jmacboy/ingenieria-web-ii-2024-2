import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListaPersonas from './pages/personas/ListaPersonas.jsx';
import FormPersona from './pages/personas/FormPersona.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FotoPersona from './pages/personas/FotoPersona.jsx';
import ListaUsuarios from './pages/usuarios/ListaUsuarios.jsx';
import FormUsuario from './pages/usuarios/FormUsuario.jsx';
import FormLogin from './pages/auth/FormLogin.jsx';
import FormRegister from './pages/auth/FormRegister.jsx';
import FormMascota from './pages/mascotas/FormMascota.jsx';
import ListaMascotas from './pages/mascotas/ListaMascotas.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <FormLogin />,
  },
  {
    path: "/register",
    element: <FormRegister />,
  },
  {
    path: '/helloworld',
    element: <App />
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
  },
  {
    path: '/personas/:id/foto',
    element: <FotoPersona />
  },
  {
    path: "/mascotas",
    element: <ListaMascotas />
  },
  {
    path: "/mascotas/create",
    element: <FormMascota />
  },
  {
    path: "/mascotas/:id",
    element: <FormMascota />
  },
  {
    path: "/usuarios",
    element: <ListaUsuarios />
  },
  {
    path: "/usuarios/create",
    element: <FormUsuario />
  },
  {
    path: "/usuarios/:id",
    element: <FormUsuario />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
