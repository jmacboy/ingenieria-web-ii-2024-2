import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "./components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [edad, setEdad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [genero, setGenero] = useState('1')
    const [usuarioId, setUsuarioId] = useState('')

    const [usuarioList, setUsuarioList] = useState([]);
    useEffect(() => {
        if (!id) return;
        getPersonaById();
    }, [id])

    useEffect(() => {
        getListaUsuarios();
    }, [])
    const getPersonaById = () => {
        axios.get(`http://localhost:3000/personas/${id}`)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombre);
                setApellido(persona.apellido);
                setCiudad(persona.ciudad);
                setEdad(persona.edad);
                setFechaNacimiento(persona.fechaNacimiento);
                setGenero(persona.genero);
                setUsuarioId(persona.usuarioId);
            }).catch(error => {
                console.log(error);
            });
    }
    const getListaUsuarios = () => {
        axios.get('http://localhost:3000/usuarios')
            .then(res => {
                setUsuarioList(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

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
                navigate('/personas');
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
    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Persona</h2>
                                </Card.Title>
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control value={nombre} type="text" onChange={onChangeNombre} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Apellido:</Form.Label>
                                        <Form.Control value={apellido} type="text" onChange={(e) => {
                                            setApellido(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Edad:</Form.Label>
                                        <Form.Control value={edad} type="number" onChange={(e) => {
                                            setEdad(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Ciudad:</Form.Label>
                                        <Form.Control value={ciudad} type="text" onChange={(e) => {
                                            setCiudad(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Fecha de nacimiento:</Form.Label>
                                        <Form.Control value={fechaNacimiento} type="date" onChange={(e) => {
                                            setFechaNacimiento(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Género:</Form.Label>
                                        <Form.Select value={genero} onChange={(e) => {
                                            setGenero(e.target.value);
                                        }} >
                                            <option value="1">Masculino</option>
                                            <option value="0">Femenino</option>
                                            <option value="-1">Indefinido</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Usuario Id:</Form.Label>
                                        <Form.Select value={usuarioId} onChange={(e) => {
                                            setUsuarioId(e.target.value);
                                        }} >
                                            <option>Seleccione un Usuario...</option>
                                            {usuarioList.map(usuario =>
                                                <option key={"user-" + usuario.id} value={usuario.id}>{usuario.email}</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button onClick={onGuardarClick}>Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FormPersona;