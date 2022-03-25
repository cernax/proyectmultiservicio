import './App.css';
import React, {Component, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Button, Col, Form, FormControl, Modal, Row} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, Route, Routes} from "react-router-dom";
import Perfil from "./Perfil/perfil";
import Home from './Home/home';
import Configuracion from "./Configuracion/configuracion";

interface RegisterUser {
    nombreuser: string,
    correouser: string,
    passuser: string,
    acountuser: string
}

function App() {

    const [name, setName] = useState("");
    const [correouser, setcorreouser] = useState("");
    const [passuser, setpassuser] = useState("");
    const [acountuser, setacountuser] = useState("");
    const [show, setshow] = useState(false);
    const [showreg, setshowreg] = useState(false);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [nombreuser, setnombreuser] = useState("");

    let loginuser = async (e) => {
        console.log(name);
        debugger;
        fetch('http://localhost:3001/api/user/' + name)
            .then(res => res.json())
            .then(data => {
                data.map(res => {
                    if(res._id.length > 0)
                    {
                        setshow(false);
                        setisAuthenticated(true);
                        setnombreuser(res.nombreuser);
                    }
                });
            })
            .catch(err => console.error(err));

        e.preventDefault();
    }

    let loginusercreate = async (e) => {
        debugger;
        console.log(name);

        fetch('http://localhost:3001/api/user',{
            method: 'POST',
            body: JSON.stringify({
                nombreuser:name,
                correouser: correouser,
                passuser: passuser,
                acountuser: acountuser
            }),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setshowreg(false);
            })
            .catch(err => {
                console.error(err);
            });

        e.preventDefault();
    }

    return (
            <>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>
                                <div>
                                    <Link to="/" style={{textDecoration:"none", color:"rgba(255,255,255,.55)"}}>MultiServicio</Link>
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <div style={{position:'absolute', paddingLeft:'10%', width:'50%'}}>
                                        <Form className="d-flex">
                                            <FormControl
                                                type="search"
                                                placeholder="Search"
                                                className="me-xl-2"
                                                aria-label="Search"
                                            />
                                            <Button variant="outline-success">Search</Button>
                                        </Form>
                                    </div>
                                    <Nav.Link href="#features">Nosotros</Nav.Link>
                                </Nav>
                                { isAuthenticated ?
                                    <Nav>
                                        <NavDropdown title={nombreuser} id="collasible-nav-dropdown">
                                            <NavDropdown.Item>
                                                <Link to="/Perfil" style={{textDecoration:"none", color:"black", width:'100%', display:'block'}}>Perfil</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <Link to="/Configuracion" style={{textDecoration:"none", color:"black", width:'100%', display:'block'}}>Configuración</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider/>
                                            <NavDropdown.Item onClick={()=> setisAuthenticated(false)}>Salir</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    :
                                    <>
                                        <Button variant="primary" onClick={()=> setshow(true)}>
                                            Login
                                        </Button>

                                        <Modal show={show} onHide={()=> setshow(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Login</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setName(e.target.value)} />
                                                        <Form.Text className="text-muted">
                                                            We'll never share your email with anyone else.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <Row>
                                                        <Col sm={9}>
                                                            <Button variant="primary" type="submit" onClick={loginuser}>
                                                                Login
                                                            </Button>
                                                        </Col>
                                                        <Col sm>
                                                            <Button variant="success" onClick={()=>{setshow(false);setshowreg(true);}}>
                                                                Registrar
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal show={showreg} onHide={()=> setshowreg(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Registrar</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Nombre</Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre" onChange={ (e)=> setName(e.target.value) } />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Usuario</Form.Label>
                                                        <Form.Control type="text" placeholder="Usuario" onChange={ (e)=> setacountuser(e.target.value) } />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email" onChange={ (e)=> setcorreouser(e.target.value) } />
                                                        <Form.Text className="text-muted">
                                                            We'll never share your email with anyone else.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password"  onChange={ (e)=> setpassuser(e.target.value) } />
                                                    </Form.Group>
                                                    <Row>
                                                        <Col sm={9}>
                                                            <Button variant="primary" type="submit" onClick={loginusercreate}>
                                                                Registrar
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    </>
                                }
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="Perfil" element={<Perfil />} />
                        <Route path="Configuracion" element={<Configuracion />} />
                    </Routes>
                </div>
            </>
    );

}

export default App;

