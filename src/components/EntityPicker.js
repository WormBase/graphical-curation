import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LoadingOverlay from 'react-loading-overlay';
import Button from "react-bootstrap/Button";
import { IoIosAddCircleOutline } from 'react-icons/io';
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import FormCheck from "react-bootstrap/FormCheck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {map} from "react-bootstrap/cjs/ElementChildren";

class EntityPicker extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedEntities: new Map(),
            offset: 0,
            count: props.count !== undefined ? props.count : 3,
            filteredEntities: props.entities,
            showAddEntity: false
        };

        this.reset = this.reset.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.entities !== prevProps.entities) {
            this.setState({filteredEntities: this.props.entities});
        }
    }

    reset() {
        this.setState({selectedEntities: new Set()});
    }

    render() {
        return (
            <LoadingOverlay
                active={this.props.isLoading}
                spinner
                text='Loading data ...'>
                {this.props.addEntity !== undefined ? <div align="center"><Button size="sm" variant="outline-primary" onClick={() => {this.setState({showAddEntity: true})}}><IoIosAddCircleOutline /> Add from source</Button><br/><br/></div> : ''}
                <AddEntityModal
                    show={this.state.showAddEntity}
                    onHide={() => this.setState({showAddEntity: false})}
                    addEntity={(entity) => this.props.addEntity(entity)}
                />
                {this.props.entities.length > 0 ? <div><FormControl size="sm" placeholder="filter" aria-label="Filter" aria-describedby="basic-addon1" onChange={event =>
                    this.setState({filteredEntities: this.props.entities.filter(entity => entity.value.startsWith(event.target.value))})
                }/><br/></div> : ''}
                <ListGroup>
                    {this.state.filteredEntities.slice(this.state.offset, this.state.offset + this.state.count).map(entity => {
                        let mapEntry = [];
                        if (this.state.selectedEntities.has(entity)) {
                            mapEntry = this.state.selectedEntities[entity]
                        } else if (this.props.checkboxes !== undefined) {
                            this.props.checkboxes.forEach(c => {mapEntry.push(false)});
                        }
                        return <ListGroup.Item action variant="default"
                            active={this.state.selectedEntities.has(entity)}>
                            <Container>
                                <Row>
                                    <Col onClick={() => {
                                        let selectedEntities = this.state.selectedEntities;
                                        if (this.props.multiSelect !== undefined) {
                                            if (selectedEntities.has(entity)) {
                                                selectedEntities.delete(entity)
                                            } else {
                                                selectedEntities.set(entity, mapEntry);
                                            }
                                        } else {
                                            selectedEntities = new Map();
                                            selectedEntities.set(entity, mapEntry);
                                        }
                                        this.props.selectedItemsCallback([...selectedEntities]);
                                        this.setState({selectedEntities: selectedEntities});
                                    }}>
                                        {entity.value}
                                    </Col>
                                    {this.props.checkboxes !== undefined ? this.props.checkboxes.map((c, i) => {
                                        return <Col><FormCheck inline type="checkbox" label={c}
                                                               onClick={() => {
                                                                   if (this.state.selectedEntities.has(entity)) {
                                                                       let selectedEntities = this.state.selectedEntities;
                                                                       let mapEntry = selectedEntities.get(entity);
                                                                       mapEntry[i] = !mapEntry[i]
                                                                       selectedEntities.set(entity, mapEntry);
                                                                       this.setState({selectedEntities: selectedEntities});
                                                                   }
                                                               }}
                                                               checked={this.state.selectedEntities.has(entity) && this.state.selectedEntities.get(entity)[i]}
                                        /></Col>}) : ''}
                                </Row>
                            </Container>
                        </ListGroup.Item>
                    })}
                </ListGroup>
                <div>
                    <br/>
                    <Button variant="outline-primary" hidden={this.state.offset === 0} onClick={() => this.setState({offset: this.state.offset - this.state.count})}>
                        prev
                    </Button>
                    <Button variant="outline-primary" hidden={this.props.entities.length <= this.state.offset + this.state.count} onClick={() => this.setState({offset: this.state.offset + this.state.count})}>
                        next
                    </Button>
                </div>
            </LoadingOverlay>
        );
    }
}

function AddEntityModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add entity
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl placeholder="search" aria-label="Filter" aria-describedby="basic-addon1" onChange={event =>
                    console.log(event.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EntityPicker;
