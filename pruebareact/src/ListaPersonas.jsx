import axios from "axios";
import { useEffect, useState } from "react";

const ListaPersonas = () => {
    const [ListaPersonas, setListaPersonas] = useState([]);
    useEffect(() => {
        getListaPersonas();
        document.title = "Prueba título";
    }, [])

    const getListaPersonas = () => {
        axios.get('http://localhost:3000/personas')
            .then(res => {
                setListaPersonas(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    return (<div>
        <h2>Lista de Personas</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Ciudad</th>
                    <th>Edad</th>
                    <th>Fecha de nacimiento</th>
                    <th>Género</th>
                    <th>Usuario Id</th>
                </tr>
            </thead>
            <tbody>
                {ListaPersonas.map(persona =>
                    <tr key={persona.id}>
                        <td>{persona.id}</td>
                        <td>{persona.nombre}</td>
                        <td>{persona.apellido}</td>
                        <td>{persona.ciudad}</td>
                        <td>{persona.edad}</td>
                        <td>{persona.fechaNacimiento}</td>
                        <td>{persona.genero}</td>
                        <td>{persona.usuarioId}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>);
}

export default ListaPersonas;