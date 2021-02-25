import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import slide1 from "../assets/images/1.jpeg";
import slide2 from "../assets/images/2.jpeg";
import slide3 from "../assets/images/3.jpeg";
import slide4 from "../assets/images/4.jpeg";
import slide5 from "../assets/images/5.jpeg";
import slide6 from "../assets/images/6.jpeg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export class AnnotationCreatedModal extends React.Component{
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Annotation Successfully {this.props.create_modify}.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export class WrongAnnotationModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Invalid Annotation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        The following required fields are missing:
                    </p>
                    <ul>
                        {this.props.missingFields.map(missingField => <li>{missingField}</li>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export class TutorialModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showTutorial: true,
            index: 0,
            slides: [slide1, slide2, slide3, slide4, slide5, slide6]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.show === false && this.props.show === true) {
            this.setState({index: 0});
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    Graphical Annotation Tutorial
                </Modal.Header>
                <Modal.Body>
                    <Image
                        className="d-block w-100"
                        src={this.state.slides[this.state.index]}
                        alt="First slide"
                        fluid
                    />
                    <Nav className="justify-content-center">
                        <ButtonGroup>
                            {this.state.index > 0 ?
                                <Button variant="warning" onClick={() => this.setState({index: this.state.index - 1})}>Previous</Button> : ""}
                            {this.state.index < this.state.slides.length - 1 ?
                                <Button variant="warning" onClick={() => this.setState({index: this.state.index + 1})}>Next</Button> : ""}
                        </ButtonGroup>
                    </Nav>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Don't show this tutorial again" checked={!this.state.showTutorial}
                                    onChange={() => {
                                        this.props.setShowTutorial(!this.state.showTutorial);
                                        this.setState({showTutorial: !this.state.showTutorial});
                                    }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}