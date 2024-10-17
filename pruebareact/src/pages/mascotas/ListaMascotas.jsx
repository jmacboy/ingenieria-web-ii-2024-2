import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
import moment from "moment";
import { generoForDisplay, tipoForDisplay } from "../../utils/stringUtils";
import { useAuth } from "../../hooks/useAuth";

const ListaMascotas = () => {
    const [listaMascotas, setListaMascotas] = useState([]);
    useAuth();
    useEffect(() => {
        getListaMascotas();
        document.title = "Prueba título";
    }, [])

    const getListaMascotas = () => {
        axios.get('http://localhost:3000/mascotas', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => {
                setListaMascotas(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/mascotas/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res.data);
                getListaMascotas();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Mascotas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Dueño</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaMascotas.map(mascota =>
                                            <tr key={mascota.id}>
                                                <td>{mascota.id}</td>
                                                <td>{mascota.nombre}</td>
                                                <td>{tipoForDisplay(mascota.tipo)}</td>
                                                <td>{mascota.persona.nombre} {mascota.persona.apellido}</td>
                                                <td><Link className="btn btn-primary" to={"/mascotas/" + mascota.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(mascota.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default ListaMascotas;