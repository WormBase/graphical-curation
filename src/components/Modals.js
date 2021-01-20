import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import slide1 from "../assets/images/1.jpg";
import slide2 from "../assets/images/2.jpg";
import slide3 from "../assets/images/3.jpg";
import slide4 from "../assets/images/4.jpg";

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
            slides: [slide1, slide2, slide3, slide4]
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
                    {this.state.index < this.state.slides.length - 1 ? <Nav className="justify-content-center">
                        <Button variant="outline-info" onClick={() => this.setState({index: this.state.index + 1})}>Next</Button>
                    </Nav> : ""}
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