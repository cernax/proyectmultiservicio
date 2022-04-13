import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import {Carousel, Col, Row} from "react-bootstrap";
import Carruseltrabajador from './Component/carruseltrabajador';

class Home extends Component {

    render() {
        return (
            <>
                <div>
                    <div style={{backgroundColor:'#efefef'}}>
                        <Container>
                            <Row>
                                <Col xs={7} style={{width:"100%"}}>
                                    <Carousel variant="dark">
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(3).jpg"
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                <h5>First slide label</h5>
                                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(2).jpg"
                                                alt="Second slide"
                                            />
                                            <Carousel.Caption>
                                                <h5>Second slide label</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(1).jpg"
                                                alt="Third slide"
                                            />
                                            <Carousel.Caption>
                                                <h5>Third slide label</h5>
                                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel></Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </div>
                    <Carruseltrabajador title='Trabajos' />
                </div>
            </>
        );
    }
}

export default Home;
