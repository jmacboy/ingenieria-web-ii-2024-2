import axios from "axios";
import { useState } from "react";

const FormPersona = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [edad, setEdad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [genero, setGenero] = useState('')
    const [usuarioId, setUsuarioId] = useState('')
    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    }
    const onGuardarClick = (e) => {
        e.preventDefault();
        const persona = {
            nombre,
            apellido,
            ciudad,
            edad,
            fechaNacimiento,
            genero,
            usuarioId
        };
        console.log(persona);
        axios.post('http://localhost:3000/personas', persona)
            .then(res => {
                console.log(res.data);
                setNombre('');
                setApellido('');
                setCiudad('');
                setEdad('');
                setFechaNacimiento('');
                setGenero('');
                setUsuarioId('');
            }).catch(error => {
                console.log(error);
            });
    }
    return (<div>
        <div>
            <label>Nombre:</label>
            <input value={nombre} type="text" onChange={onChangeNombre} />
        </div>
        <div>
            <label>Apellido:</label>
            <input value={apellido} type="text" onChange={(e) => {
                setApellido(e.target.value);
            }} />
        </div>
        <div>
            <label>Edad:</label>
            <input value={edad} type="number" onChange={(e) => {
                setEdad(e.target.value);
            }} />
        </div>
        <div>
            <label>Ciudad:</label>
            <input value={ciudad} type="text" onChange={(e) => {
                setCiudad(e.target.value);
            }} />
        </div>
        <div>
            <label>Fecha de nacimiento:</label>
            <input value={fechaNacimiento} type="date" onChange={(e) => {
                setFechaNacimiento(e.target.value);
            }} />
        </div>
        <div>
            <label>Género:</label>
            <input value={genero} type="number" onChange={(e) => {
                setGenero(e.target.value);
            }} />
        </div>
        <div>
            <label>Usuario Id:</label>
            <input value={usuarioId} type="number" onChange={(e) => {
                setUsuarioId(e.target.value);
            }} />
        </div>
        <button onClick={onGuardarClick}>Guardar datos</button>
    </div>);
}

export default FormPersona;