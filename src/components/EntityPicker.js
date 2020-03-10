import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LoadingOverlay from 'react-loading-overlay';
import Button from "react-bootstrap/Button";
import { IoIosAddCircleOutline } from 'react-icons/io';
import FormControl from "react-bootstrap/FormControl";

class EntityPicker extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedEntities: new Set(),
            offset: 0,
            count: props.count !== undefined ? props.count : 3,
            filteredEntities: props.entities
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
                <FormControl placeholder="Filter" aria-label="Filter" aria-describedby="basic-addon1" onChange={event =>
                    this.setState({filteredEntities: this.props.entities.filter(entity => entity.startsWith(event.target.value))})
                }/>
                <br/>
                <ListGroup>
                    {this.state.filteredEntities.slice(this.state.offset, this.state.offset + this.state.count).map(entity => {
                        return <ListGroup.Item action
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
                            {entity}
                        </ListGroup.Item>
                    })}
                </ListGroup>
                <div>
                    <Button variant="light" onClick={() => {}}><IoIosAddCircleOutline /></Button>
                    <Button variant="light" disabled={this.state.offset === 0} onClick={() => this.setState({offset: this.state.offset - this.state.count})}>
                        Prev
                    </Button>
                    <Button variant="light" disabled={this.props.entities.length <= this.state.offset + this.state.count} onClick={() => this.setState({offset: this.state.offset + this.state.count})}>
                        Next
                    </Button>
                </div>
            </LoadingOverlay>
        );
    }
}

export default EntityPicker;
