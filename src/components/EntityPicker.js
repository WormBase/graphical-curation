import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class EntityPicker extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedEntities: new Set()
        };

        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState({selectedEntities: new Set()});
    }

    render() {
        return (
            <ListGroup>
                {this.props.entities.map(entity => {
                    return <ListGroup.Item
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
        );
    }
}

export default EntityPicker;
