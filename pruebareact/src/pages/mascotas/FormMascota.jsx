import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const FormMascota = () => {
    const navigate = useNavigate();
    useAuth();

    const { id } = useParams();
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('1')
    const [personaId, setPersonaId] = useState('')

    const [personaList, setPersonaList] = useState([]);
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        if (!id) return;
        getMascotaById();
    }, [id])

    useEffect(() => {
        getListaPersonas();
    }, [])
    const getMascotaById = () => {
        axios.get(`http://localhost:3000/mascotas/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        ).then(res => {
            const mascota = res.data;
            setNombre(mascota.nombre);
            setTipo(mascota.tipo);
            setPersonaId(mascota.personaId);
        }).catch(error => {
            console.log(error);
        });
    }
    const getListaPersonas = () => {
        axios.get('http://localhost:3000/personas', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                setPersonaList(res.data);
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
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const mascota = {
            nombre,
            tipo,
            personaId
        };
        console.log(mascota);
        if (id) {
            editMascota(mascota);
        } else {
            insertMascota(mascota);
        }

    }
    const editMascota = (mascota) => {
        axios.put(`http://localhost:3000/mascotas/${id}`, mascota, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data);
                navigate('/mascotas');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertMascota = (mascota) => {
        axios.post('http://localhost:3000/mascotas', mascota, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data);
                navigate('/mascotas');
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
                                    <h2>Formulario Mascota</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={onChangeNombre} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Tipo:</Form.Label>

                                        <Form.Select required value={tipo} onChange={(e) => {
                                            setTipo(e.target.value);
                                        }} >
                                            <option value="1">Perro</option>
                                            <option value="2">Gato</option>
                                            <option value="3">Loro</option>
                                            <option value="4">Capibara</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un tipo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Persona:</Form.Label>
                                        <Form.Select required value={personaId} onChange={(e) => {
                                            setPersonaId(e.target.value);
                                        }} >
                                            <option value="">Seleccione un Persona...</option>
                                            {personaList.map(persona =>
                                                <option key={"user-" + persona.id} value={persona.id}>{persona.nombre} {persona.apellido}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un persona.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FormMascota;