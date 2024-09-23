import { useState } from "react"
import FormPersona from "./FormPersona";
import ListaPersonas from "./ListaPersonas";

const App = () => {
  const [nombre, setNombre] = useState('');
  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <input onChange={(e) => {
          setNombre(e.target.value);
        }} type="text" placeholder="Ingrese su nombre..." />
      </div>
      <div>Mi nombre es: {nombre}</div>
      <ListaPersonas />
      <FormPersona />
    </div>
  )
}

export default App
