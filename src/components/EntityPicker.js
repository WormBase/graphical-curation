import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LoadingOverlay from 'react-loading-overlay';
import Button from "react-bootstrap/Button";
import { IoIosAddCircleOutline } from 'react-icons/io';
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";

class EntityPicker extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedEntities: new Set(),
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
                <FormControl size="sm" placeholder="search" aria-label="Filter" aria-describedby="basic-addon1" onChange={event =>
                    this.setState({filteredEntities: this.props.entities.filter(entity => entity.value.startsWith(event.target.value))})
                }/>
                <div>
                    <Button variant="light" disabled={this.state.offset === 0} onClick={() => this.setState({offset: this.state.offset - this.state.count})}>
                        prev
                    </Button>
                    <Button variant="light" disabled={this.props.entities.length <= this.state.offset + this.state.count} onClick={() => this.setState({offset: this.state.offset + this.state.count})}>
                        next
                    </Button>
                    {this.props.addEntity !== undefined ? <Button variant="light" onClick={() => {this.setState({showAddEntity: true})}}><IoIosAddCircleOutline /> add</Button> : ''}
                </div>
                <AddEntityModal
                    show={this.state.showAddEntity}
                    onHide={() => this.setState({showAddEntity: false})}
                    addEntity={(entity) => this.props.addEntity(entity)}
                />
                <ListGroup>
                    {this.state.filteredEntities.slice(this.state.offset, this.state.offset + this.state.count).map(entity => {
                        return <ListGroup.Item action variant="default"
                            active={this.state.selectedEntities.has(entity)}
                            onClick={() => {
                                let selectedEntities = this.state.selectedEntities;
                                if (this.props.multiSelect !== undefined) {
                                    if (selectedEntities.has(entity)) {
                                        selectedEntities.delete(entity)
                                    } else {
                                        selectedEntities.add(entity);
                                    }
                                } else {
                                    selectedEntities = new Set([entity]);
                                }
                                this.props.selectedItemsCallback([...selectedEntities]);
                                this.setState({selectedEntities: selectedEntities});
                            }}>
                            {entity.value}
                        </ListGroup.Item>
                    })}
                </ListGroup>
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
