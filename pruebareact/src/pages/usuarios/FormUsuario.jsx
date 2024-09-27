import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormUsuario = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getUsuarioById();
    }, [id])
    const getUsuarioById = () => {
        axios.get(`http://localhost:3000/usuarios/${id}`)
            .then(res => {
                const usuario = res.data;
                setEmail(usuario.email);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        setErrorText('');
        const usuario = {
            email
        };
        if (!id) {
            usuario.password = password;
        }
        console.log(usuario);
        if (id) {
            editUsuario(usuario);
        } else {
            insertUsuario(usuario);
        }

    }
    const editUsuario = (usuario) => {
        axios.patch(`http://localhost:3000/usuarios/${id}`, usuario)
            .then(res => {
                console.log(res.data);
                navigate('/usuarios');
            }).catch(error => {
                const errorMsg = error.response.data.msg;
                setErrorText(errorMsg);
                console.log(error);
            });
    }
    const insertUsuario = (usuario) => {
        axios.post('http://localhost:3000/usuarios', usuario)
            .then(res => {
                console.log(res.data);
                navigate('/usuarios');
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
                                    <h2>Formulario Usuario</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorText && <Alert variant="danger">{errorText}</Alert>}
                                    <Form.Group >
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control required value={email} type="email" onChange={onChangeEmail} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un correo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {!id &&
                                        <Form.Group >
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control required value={password} type="password" onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} />
                                            <Form.Control.Feedback type="invalid">
                                                Por favor ingrese una contraseña.
                                            </Form.Control.Feedback>
                                        </Form.Group>}
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

export default FormUsuario;