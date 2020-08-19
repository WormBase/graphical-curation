import React, {Component} from 'react';
import {connect} from "react-redux";
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
import {
    getAutocompleteEntities,
    getAutocompleteError,
    isAutocompleteLoading
} from "../redux/selectors/autocompleteEntitiesSelector";
import {fetchAutocompleteEntities, resetAutocompleteEntities} from "../redux/actions/autocompleteEntitiesActions";
import {isLoading} from "../redux/selectors/textMinedEntitiesSelector";
import './EntityPicker.css';


class EntityPicker extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedEntities: new Map(),
            offset: 0,
            count: props.count !== undefined ? props.count : 3,
            filteredEntities: [],
            allEntities: props.entities,
            showAddEntity: false
        };

        this.reset = this.reset.bind(this);
    }

    returnSelectedEntities(selectedEntities) {
        let returnEntities = '';
        if (selectedEntities.size > 0) {
            returnEntities = Array.from(selectedEntities).map(([key, value]) => {
                let entity = {
                    value: JSON.parse(key).value,
                };
                if (JSON.parse(key).modId !== undefined) {
                    entity.modId = JSON.parse(key).modId;
                }
                if (value.size > 0) {
                    entity.options = Object.fromEntries(value);
                }
                return entity;
            });
            if (this.props.multiSelect === undefined && returnEntities.length > 0) {
                returnEntities = returnEntities[0];
            }
        }
        this.props.selectedItemsCallback(returnEntities);
    }

    reset() {
        this.setState({selectedEntities: new Map()});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.entities !== prevProps.entities || this.props.selectedEntities !== prevProps.selectedEntities) {
            let filteredEntities = [];
            let selectedEntitiesMap = this.state.selectedEntities;
            if (this.props.entities !== undefined) {
                this.props.entities.forEach(e => filteredEntities.push(e));
            }
            if (this.props.selectedEntities !== prevProps.selectedEntities && this.props.selectedEntities !== undefined) {
                let selectedEntitiesArray;
                selectedEntitiesMap = new Map();
                if (this.props.selectedEntities !== '') {
                    if (Array.isArray(this.props.selectedEntities)) {
                        selectedEntitiesArray = this.props.selectedEntities;
                    } else {
                        selectedEntitiesArray = [this.props.selectedEntities];
                    }
                    selectedEntitiesArray.forEach(a => {
                        if (a.options !== undefined) {
                            let entity = {value: a.value};
                            if (a.modId !== undefined) {
                                entity.modId = a.modId;
                            }
                            selectedEntitiesMap.set(JSON.stringify(entity),
                                new Map(Object.entries(a.options)));
                        } else {
                            selectedEntitiesMap.set(JSON.stringify(a), new Map());
                        }
                    });
                }
                selectedEntitiesMap.forEach((v, k) => {
                    filteredEntities.forEach((item, index, object) => {
                        if (JSON.parse(k).value === item.value) {
                            object.splice(index, 1)
                        }
                    })
                    filteredEntities.push(JSON.parse(k));
                });
            }
            filteredEntities.sort((a, b) => (a.value > b.value) ? 1 : -1);
            this.setState({
                selectedEntities: selectedEntitiesMap,
                offset: 0,
                count: this.props.count !== undefined ? this.props.count : 3,
                filteredEntities: filteredEntities,
                allEntities: filteredEntities,
                showAddEntity: false});
        }
    }

    render() {
        return (
            <LoadingOverlay
                active={this.props.isLoading}
                spinner
                text='Loading data ...'>
                <div align="center"><h6>{this.props.title}</h6></div>
                {this.props.addEntity !== undefined ?
                    <div align="center"><Button size="sm" variant="outline-primary" onClick={() => {this.setState({showAddEntity: true})}}><IoIosAddCircleOutline /> Add from source</Button>
                        <div className="whiteSpace"/>
                    </div> : ''}
                <AddEntityModal
                    show={this.state.showAddEntity}
                    onHide={() => {
                        this.setState({showAddEntity: false});
                        this.props.resetAutocompleteEntities();
                    }}
                    addEntity={(e) => {
                        this.props.addEntity(e);
                        let mapEntry = new Map();
                        if (this.props.checkboxes !== undefined) {
                            this.props.checkboxes.forEach(c => {mapEntry.set(c, false)});
                        }
                        let selectedEntities = this.state.selectedEntities;
                        if (this.props.multiSelect === undefined) {
                            selectedEntities = new Map();
                        }
                        selectedEntities.set(JSON.stringify(e), mapEntry);
                        this.returnSelectedEntities(selectedEntities);
                        this.setState({selectedEntities: selectedEntities});
                    }}
                    autocompleteObj={this.props.autocompleteObj}
                    autocompleteEntities={this.props.autocompleteEntities}
                    autocompleteFetchFnct={this.props.fetchAutocompleteEntities}
                    entityType={this.props.entityType}
                />
                {this.state.allEntities.length > 0 ? <div><FormControl size="sm" placeholder="filter" aria-label="Filter" aria-describedby="basic-addon1" onChange={event =>
                    this.setState({filteredEntities: this.state.allEntities.filter(entity => entity.value.startsWith(event.target.value))})
                }/><div className="whiteSpace"/></div> : ''}
                <ListGroup>
                    {this.state.filteredEntities.slice(this.state.offset, this.state.offset + this.state.count).map(entity => {
                        let mapEntry = new Map();
                        if (this.state.selectedEntities.has(JSON.stringify(entity))) {
                            mapEntry = this.state.selectedEntities.get(JSON.stringify(entity));
                        } else if (this.props.checkboxes !== undefined) {
                            this.props.checkboxes.forEach(c => {mapEntry.set(c, false)});
                        }
                        return <ListGroup.Item action variant="default" className="py-1"
                                               active={this.state.selectedEntities.has(JSON.stringify(entity))}>
                            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Row>
                                    <Col onClick={() => {
                                        let selectedEntities = this.state.selectedEntities;
                                        if (selectedEntities.has(JSON.stringify(entity))) {
                                            selectedEntities.delete(JSON.stringify(entity));
                                        } else {
                                            if (this.props.multiSelect === undefined) {
                                                selectedEntities = new Map();
                                            }
                                            selectedEntities.set(JSON.stringify(entity), mapEntry);
                                        }
                                        this.returnSelectedEntities(selectedEntities);
                                        this.setState({selectedEntities: selectedEntities});
                                    }}>
                                        {entity.value}
                                    </Col>
                                    {this.props.checkboxes !== undefined ? this.props.checkboxes.map(c => {
                                        return <Col><FormCheck inline type="checkbox" label={c}
                                                               onClick={() => {
                                                                   if (this.state.selectedEntities.has(JSON.stringify(entity))) {
                                                                       let selectedEntities = this.state.selectedEntities;
                                                                       let mapEntry = selectedEntities.get(JSON.stringify(entity));
                                                                       mapEntry.set(c, !mapEntry.get(c))
                                                                       selectedEntities.set(JSON.stringify(entity), mapEntry);
                                                                       this.returnSelectedEntities(selectedEntities);
                                                                       this.setState({selectedEntities: selectedEntities});
                                                                   }
                                                               }}
                                                               checked={this.state.selectedEntities.has(JSON.stringify(entity)) && this.state.selectedEntities.get(JSON.stringify(entity)).get(c)}
                                        /></Col>}) : ''}
                                </Row>
                            </Container>
                        </ListGroup.Item>
                    })}
                </ListGroup>
                <div>
                    <Button variant="outline-primary" size="sm" hidden={this.state.offset === 0} onClick={() => this.setState({offset: this.state.offset - this.state.count})}>
                        prev
                    </Button>
                    <Button variant="outline-primary" size="sm" hidden={this.state.allEntities.length <= this.state.offset + this.state.count} onClick={() => this.setState({offset: this.state.offset + this.state.count})}>
                        next
                    </Button>
                </div><div className="whiteSpace"/><div className="whiteSpace"/>
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
                <Container fluid>
                    <Row>
                        <Col>
                            <FormControl placeholder="search" aria-label="Filter" aria-describedby="basic-addon1" onChange={event =>
                                props.autocompleteFetchFnct(props.autocompleteObj, props.entityType, event.target.value)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            &nbsp;
                        </Col>
                    </Row>
                    {props.autocompleteEntities.map(e => <Row><Col onDoubleClick={() => {
                        props.addEntity(e);
                        props.onHide();
                    }}>{e.value} ( {e.modId} )</Col></Row>)}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = state => ({
    autocompleteEntities: getAutocompleteEntities(state),
    isLoading: isLoading(state),
    autocompleteError: getAutocompleteError(state),
    isAutocompleteLoading: isAutocompleteLoading(state)
});

export default connect(mapStateToProps, {fetchAutocompleteEntities, resetAutocompleteEntities}, null, {forwardRef: true})(EntityPicker);
