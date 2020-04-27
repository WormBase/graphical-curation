import React, {Component} from 'react';
import ExpressionAnnotator from "./ExpressionAnnotator";
import ExpressionAnnotationsViewer from "./ExpressionAnnotationsViewer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError} from "../redux/actions/textMinedEntitiesAction";
import {getExpressionAnnotations} from "../redux/selectors/expressionAnnotationsSelector";
import {setExpressionAnnotations} from "../redux/actions/expressionAnnotationsActions";

class GraphicalCuration extends Component{

    componentDidMount() {
        if (this.props.loading) {
            this.props.fetchEntitiesRequest();
        }
        this.props.fetchEntitiesSuccess(this.props.entities);
        if (this.props.error) {
            this.props.fetchEntitiesError(this.props.error);
        }
        this.props.setExpressionAnnotations(this.props.expressionAnnotations);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loading !== prevProps.loading && this.props.loading) {
            this.props.fetchEntitiesRequest();
        }
        if (this.props.entities !== prevProps.entities) {
            this.props.fetchEntitiesSuccess(this.props.entities);
        }
        if (this.props.error !== prevProps.error && this.props.error) {
            this.props.fetchEntitiesError(this.props.error);
        }
        if (this.props.expressionAnnotations !== prevProps.expressionAnnotations) {
            this.props.setExpressionAnnotations(this.props.expressionAnnotations);
        }
    }

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" eventKey="0">
                                Expression Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Tabs defaultActiveKey="annotator">
                                    <Tab eventKey="annotator" title="Create Annotation">
                                        <ExpressionAnnotator maxEntities={5}/>
                                    </Tab>
                                    <Tab eventKey="viewer" title="View Annotations">
                                        <ExpressionAnnotationsViewer/>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" eventKey="1">
                                Phenotype Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                Phenotype annotations not available
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <br/>
                <br/>
                <br/>
                <div align="center">
                    <Button variant="primary" onClick={
                        () => {this.props.expressionAnnotationsSaved(this.props.expressionAnnotations)}
                    }>
                        Save All Annotations
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    expressionAnnotations: getExpressionAnnotations(state)
});

export default connect(mapStateToProps, {
    fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError, setExpressionAnnotations})(GraphicalCuration);
