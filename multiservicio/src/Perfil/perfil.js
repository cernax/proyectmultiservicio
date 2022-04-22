import React, {useState} from "react";
import {Card, Col, Row, Button, Modal, Form} from "react-bootstrap";
import {BsFillPencilFill} from "react-icons/all";

function Perfil(props) {

    //crear perfil
    const [show, setShow] = useState(false);
    const [firstshow, setfirstshow] = useState(false);
    const [profesion, setprofesion] = useState("");
    const [descript, setdescript] = useState("");
    const [datatiptrabajo, setdatatiptrabajo] = useState([]);
    const [tieneTrabajo, settieneTrabajo] = useState(false);
    const [urlimgperfil, seturlimgperfil] = useState("");

    //cargar imagenes
    const [file, setfile] = useState([]);

    //cargar trabajo
    const [nomtrabajo, setnomtrabajo] = useState("");
    const [desctrabajo, setdesctrabajo] = useState("");
    const [imgstrabajos, setimgstrabajos] = useState([]);

    const [datostrabajos, setdatostrabajos] = useState([]);

    let datajob = [];

    const onChangeFile = e => {
        setfile(e.target.files[0]);
    }
    const onChangeFileTrabajos = e => {
        setimgstrabajos(e.target.files[0]);
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClosefirstshow = () => setfirstshow(false);
    const handlefirstshow = () => setfirstshow(true);

    let ConsultTrabajo = async () => {
        await fetch('http://localhost:3001/api/profile/' + props.name)
                .then(res => res.json())
                .then(data => {
                    if(data.length === 0)
                    {
                        ConsultTipoTrabajo();
                        setfirstshow(true);
                        settieneTrabajo(false);
                    }
                    else {
                        data.forEach(resp => {
                            setprofesion(resp.profesion);
                            setdescript(resp.descrip);
                            settieneTrabajo(true);
                            seturlimgperfil(resp.image.url);
                        })
                    }
                })
                .catch(err => console.error(err));


            datajob = await fetch('http://localhost:3001/api/portafolio/' + props.name)
                .then(res => res.json())
                .then(data => {
                    if(data.length > 0)
                    {
                        return data;
                    }
                })
                .catch(err => console.error(err));
            console.log(datajob);
        }

    let ConsultTipoTrabajo = async () => {
            fetch('http://localhost:3001/api/profesion/')
                .then(res => res.json())
                .then(data => {
                    if(data.length > 0)
                    {
                        setdatatiptrabajo(data);
                    }
                })
                .catch(err => console.error(err));
        }

    let guardarTipoTrabajo = async (e) => {

        const data = new FormData();
        data.append("img", file);
        data.append('acountuser', props.name);
        data.append('profesion', profesion);
        data.append('descrip', descript);

        const res = await fetch('http://localhost:3001/api/profile',{
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(dt => {
                    console.log(dt);
                    handleClosefirstshow();
                })
                .catch(err => {
                    console.error(err);
                });

            e.preventDefault();
        }

    let guardarTrabajos = async (e) => {

        const data = new FormData();
        data.append("img", imgstrabajos);
        data.append('acountuser', props.name);
        data.append('nomportafolio', nomtrabajo);
        data.append('descrip', desctrabajo);

        const res = await fetch('http://localhost:3001/api/portafolio',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(dt => {
                console.log(dt);
                handleClose();
            })
            .catch(err => {
                console.error(err);
            });

        e.preventDefault();
    }

        return (
            <>
                <div onLoad={ConsultTrabajo} >
                    <Card className="bg-white text-white">
                        <Card.Img src={urlimgperfil} alt="Card image" style={{width:"50%"}} />
                        <Card.ImgOverlay>
                            <div style={{display: "flex"}} >
                                <Card.Title>{props.title}</Card.Title>&nbsp;&nbsp;&nbsp;
                                <BsFillPencilFill onClick={handlefirstshow} style={{cursor:"pointer"}} />
                            </div>
                            <Card.Text>{profesion}</Card.Text>
                            <Card.Text>{descript}</Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                    <hr/>
                    <Button variant="primary" onClick={handleShow}>Nuevo trabajo</Button>
                    <hr/>
                    {
                        datajob.map( res => {
                            return <div>{res.nomportafolio}</div>
                        })
                    }
                    <Row xs={1} md={4} className="g-4" style={{width:"100%"}}>
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://mdbootstrap.com/img/Photos/Slides/img%20(90).jpg" />
                                    <Card.Body>
                                        <Card.Title>Card title</Card.Title>
                                        <Card.Text>
                                            This is a longer card with supporting text below as a natural
                                            lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cargar Trabajo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nombre de Trabajo</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"  onChange={(e)=> {
                                    setnomtrabajo(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descripción del Trabajo</Form.Label>
                                <Form.Control as="textarea" rows={3} value={desctrabajo} onChange={(e)=> {
                                    setdesctrabajo(e.target.value)
                                }} />
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Control type="file" multiple  onChange={onChangeFileTrabajos}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={guardarTrabajos}>
                            Guardar
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={firstshow} onHide={handleClosefirstshow}>
                    <Modal.Header closeButton>
                        <Modal.Title> { tieneTrabajo ? "Actualiza su perfil" : "Cree su perfil" }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Profecion</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e)=> {
                                    setprofesion(e.target.value)
                                }}>
                                    <option>Seleccione un tipo de Trabajo</option>
                                    {
                                        datatiptrabajo.map((item, i) => {
                                            return (<option id={item.id} value={item.profesion}>{item.profesion}</option>)
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e)=> setdescript(e.target.value)} value={descript} />
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Foto de perfil</Form.Label>
                                <Form.Control type="file" multiple onChange={onChangeFile} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={guardarTipoTrabajo}>
                            Guardar
                        </Button>
                        <Button variant="secondary" onClick={handleClosefirstshow}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
}

export default Perfil;
