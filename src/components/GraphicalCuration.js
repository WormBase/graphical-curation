import React, {Component} from 'react';
import ExpressionAnnotator from "./ExpressionAnnotator";
import ExpressionAnnotationsViewer from "./ExpressionAnnotationsViewer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Tab from "react-bootstrap/Tab";
import {fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError} from "../redux/actions/textMinedEntitiesActions";
import {getExpressionAnnotations} from "../redux/selectors/expressionAnnotationsSelector";
import {setExpressionAnnotations} from "../redux/actions/expressionAnnotationsActions";
import PhenotypeAnnotator from "./PhenotypeAnnotator";
import PhenotypeAnnotationsViewer from "./PhenotypeAnnotationsViewer";
import {setPhenotypeAnnotations} from "../redux/actions/phenotypeAnnotationsActions";
import AnatomyFunctionAnnotator from "./AnatomyFunctionAnnotator";
import AnatomyFunctionAnnotationsViewer from "./AnatomyFunctionAnnotationsViewer";
import {getPhenotypeAnnotations} from "../redux/selectors/phenotypeAnnotationsSelector";
import {
    getActiveAnnotationType,
    getActiveView, getAnatomyFunctionAnnotationForEditing,
    getExpressionAnnotationForEditing, getPhenotypeAnnotationForEditing
} from "../redux/selectors/internalStateSelector";
import {
    setActiveAnnotationType,
    setActiveView,
    unsetExpressionAnnotationForEditing
} from "../redux/actions/internalStateActions";
import Nav from "react-bootstrap/Nav";
import {setAnatomyFunctionAnnotations} from "../redux/actions/anatomyFunctionAnnotationsActions";

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
        this.props.setAnatomyFunctionAnnotations(this.props.anatomyFunctionAnnotations);
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
        if (this.props.anatomyFunctionAnnotations !== prevProps.anatomyFunctionAnnotations) {
            this.props.setAnatomyFunctionAnnotations(this.props.anatomyFunctionAnnotations);
        }
    }

    render() {
        return (
            <div>
                <Accordion activeKey={this.props.activeAnnotationType}>
                    {this.state.showExpressionCuration ?
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" onClick={() => this.props.setActiveAnnotationType("expression")}>
                                Expression Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="expression">
                            <Card.Body>
                                <Tab.Container activeKey={this.props.activeView}>
                                    <Nav variant="tabs" defaultActiveKey="references">
                                        <Nav.Item>
                                            <Nav.Link eventKey="annotator" onClick={() => this.props.setActiveView("annotator")}>{this.props.expressionAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="viewer" onClick={() => this.props.setActiveView("viewer")}>View Annotations</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="annotator">
                                            <ExpressionAnnotator maxEntities={this.state.maxEntities}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="viewer">
                                            <ExpressionAnnotationsViewer/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> : ''}
                    {this.state.showPhenotypeCuration ?
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" onClick={() => this.props.setActiveAnnotationType("phenotype")}>
                                Phenotype Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="phenotype">
                            <Card.Body>
                                <Tab.Container activeKey={this.props.activeView}>
                                    <Nav variant="tabs" defaultActiveKey="references">
                                        <Nav.Item>
                                            <Nav.Link eventKey="annotator" onClick={() => this.props.setActiveView("annotator")}>{this.props.phenotypeAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="viewer" onClick={() => this.props.setActiveView("viewer")}>View Annotations</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="annotator">
                                            <PhenotypeAnnotator maxEntities={this.state.maxEntities}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="viewer">
                                            <PhenotypeAnnotationsViewer/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> : ''}
                    {this.state.showAnatomyFunctionCuration ?
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" onClick={() => this.props.setActiveAnnotationType("anatomyFunction")}>
                                Anatomy Function Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="anatomyFunction">
                            <Card.Body>
                                <Tab.Container activeKey={this.props.activeView}>
                                    <Nav variant="tabs" defaultActiveKey="references">
                                        <Nav.Item>
                                            <Nav.Link eventKey="annotator" onClick={() => this.props.setActiveView("annotator")}>{this.props.anatomyFunctionAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="viewer" onClick={() => this.props.setActiveView("viewer")}>View Annotations</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="annotator">
                                            <AnatomyFunctionAnnotator maxEntities={this.state.maxEntities}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="viewer">
                                            <AnatomyFunctionAnnotationsViewer/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
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
                            phenotype: this.props.storedPhenotypeAnnotations })}>
                        Save All Annotations
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    storedExpressionAnnotations: getExpressionAnnotations(state),
    storedPhenotypeAnnotations: getPhenotypeAnnotations(state),
    activeAnnotationType: getActiveAnnotationType(state),
    activeView: getActiveView(state),
    expressionAnnotationForEditing: getExpressionAnnotationForEditing(state),
    phenotypeAnnotationForEditing: getPhenotypeAnnotationForEditing(state),
    anatomyFunctionAnnotationForEditing: getAnatomyFunctionAnnotationForEditing(state)
});

export default connect(mapStateToProps, {
    fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError, setExpressionAnnotations,
    setPhenotypeAnnotations, setAnatomyFunctionAnnotations, setActiveAnnotationType, setActiveView,
    unsetExpressionAnnotationForEditing})(GraphicalCuration);
