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
import PhenotypeAnnotator from "./PhenotypeAnnotator";
import PhenotypeAnnotationsViewer from "./PhenotypeAnnotationsViewer";
import {setPhenotypeAnnotations} from "../redux/actions/phenotypeAnnotationsActions";
import AnatomyFunctionAnnotator from "./AnatomyFunctionAnnotator";
import AnatomyFunctionAnnotationsViewer from "./AnatomyFunctionAnnotationsViewer";

class GraphicalCuration extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showExpressionCuration: true,
            showPhenotypeCuration: true,
            showAnatomyFunctionCuration: true,
            maxEntities: 5
        };
    }

    componentDidMount() {
        if (this.props.loading) {
            this.props.fetchEntitiesRequest();
        }
        this.props.fetchEntitiesSuccess(this.props.entities);
        if (this.props.error) {
            this.props.fetchEntitiesError(this.props.error);
        }
        this.props.setExpressionAnnotations(this.props.expressionAnnotations);
        this.props.setPhenotypeAnnotations(this.props.phenotypeAnnotations);
        if (this.props.showExpressionCuration !== undefined) {
            this.setState({showExpressionCuration: this.props.showExpressionCuration})
        }
        if (this.props.showPhenotypeCuration !== undefined) {
            this.setState({showPhenotypeCuration: this.props.showPhenotypeCuration})
        }
        if (this.props.showAnatomyFunctionCuration !== undefined) {
            this.setState({showAnatomyFunctionCuration: this.props.showAnatomyFunctionCuration})
        }
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
        if (this.props.phenotypeAnnotations !== prevProps.phenotypeAnnotations) {
            this.props.setPhenotypeAnnotations(this.props.phenotypeAnnotations);
        }
    }

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0">
                    {this.state.showExpressionCuration ?
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
                                        <ExpressionAnnotator maxEntities={this.state.maxEntities}/>
                                    </Tab>
                                    <Tab eventKey="viewer" title="View Annotations">
                                        <ExpressionAnnotationsViewer/>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> : ''}
                    {this.state.showPhenotypeCuration ?
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" eventKey="1">
                                Phenotype Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Tabs defaultActiveKey="annotator">
                                    <Tab eventKey="annotator" title="Create Annotation">
                                        <PhenotypeAnnotator maxEntities={this.state.maxEntities}/>
                                    </Tab>
                                    <Tab eventKey="viewer" title="View Annotations">
                                        <PhenotypeAnnotationsViewer/>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> : ''}
                    {this.state.showAnatomyFunctionCuration ?
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" eventKey="2">
                                Anatomy Function Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Tabs defaultActiveKey="annotator">
                                    <Tab eventKey="annotator" title="Create Annotation">
                                        <AnatomyFunctionAnnotator maxEntities={this.state.maxEntities}/>
                                    </Tab>
                                    <Tab eventKey="viewer" title="View Annotations">
                                        <AnatomyFunctionAnnotationsViewer/>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> : ''}
                </Accordion>
                <br/>
                <br/>
                <br/>
                <div align="center">
                    <Button variant="primary" onClick={
                        () => this.props.annotationsSaved({expression: this.props.storedExpressionAnnotations,
                            phenotype: this.props.phenotypeAnnotations })}>
                        Save All Annotations
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    storedExpressionAnnotations: getExpressionAnnotations(state)
});

export default connect(mapStateToProps, {
    fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError, setExpressionAnnotations,
    setPhenotypeAnnotations})(GraphicalCuration);
