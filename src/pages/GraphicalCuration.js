import React, {Component} from 'react';
import ExpressionAnnotator from "./ExpressionAnnotator";
import ExpressionAnnotationsViewer from "./ExpressionAnnotationsViewer";
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
import {getAnatomyFunctionAnnotations} from "../redux/selectors/anatomyFunctionAnnotationsSelector";

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
        let showExpressionCuration = this.state.showExpressionCuration;
        let showPhenotypeCuration = this.state.showPhenotypeCuration;
        let showAnatomyFunctionCuration = this.state.showAnatomyFunctionCuration;
        if (this.props.showExpressionCuration !== undefined) {
            showExpressionCuration = this.props.showExpressionCuration;
        }
        if (this.props.showPhenotypeCuration !== undefined) {
            showPhenotypeCuration = this.props.showPhenotypeCuration;
        }
        if (this.props.showAnatomyFunctionCuration !== undefined) {
            showAnatomyFunctionCuration = this.props.showAnatomyFunctionCuration;
        }
        let activeViewArr = [['expression', showExpressionCuration], ['phenotype', showPhenotypeCuration], ['anatomyFunction', showAnatomyFunctionCuration]];
        console.log(activeViewArr.filter(([viewType, shown]) => shown === true)[0][0]);
        this.props.setActiveAnnotationType(activeViewArr.filter(([viewType, shown]) => shown)[0][0]);
        this.setState({
            showExpressionCuration: showExpressionCuration,
            showPhenotypeCuration: showPhenotypeCuration,
            showAnatomyFunctionCuration: showAnatomyFunctionCuration
        });
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
                <Tab.Container activeKey={this.props.activeAnnotationType}>
                     <Nav variant="pills">
                         {this.state.showExpressionCuration ?
                         <Nav.Item>
                             <Nav.Link eventKey="expression" onClick={() => this.props.setActiveAnnotationType("expression")}>Expression</Nav.Link>
                         </Nav.Item> : ''}
                         {this.state.showPhenotypeCuration ?
                         <Nav.Item>
                             <Nav.Link eventKey="phenotype" onClick={() => this.props.setActiveAnnotationType("phenotype")}>Phenotype</Nav.Link>
                         </Nav.Item> : ''}
                         {this.state.showAnatomyFunctionCuration ?
                         <Nav.Item>
                             <Nav.Link eventKey="anatomyFunction" onClick={() => this.props.setActiveAnnotationType("anatomyFunction")}>Anatomy Function</Nav.Link>
                         </Nav.Item> : ''}
                         <Nav.Item>
                             &nbsp;&nbsp;<Button variant="outline-success" onClick={
                                 () => this.props.annotationsSaved({expression: this.props.storedExpressionAnnotations,
                                     phenotype: this.props.storedPhenotypeAnnotations, anatomyFunction: this.props.storedAnatomyFunctionAnnotations })}>
                                 Save All Changes
                             </Button>
                         </Nav.Item>
                     </Nav>
                    <Tab.Content>
                        <br/>
                        {this.state.showExpressionCuration ?
                        <Tab.Pane eventKey="expression">
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
                                        <ExpressionAnnotator maxEntities={this.state.maxEntities}
                                                             evidence={this.props.evidence}
                                                             autocompleteObj={this.props.autocompleteObj}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="viewer">
                                        <ExpressionAnnotationsViewer showAnnotationIds={this.props.showAnnotationIds}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Tab.Pane> : ''}
                        {this.state.showPhenotypeCuration ?
                        <Tab.Pane eventKey="phenotype">
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
                                        <PhenotypeAnnotator maxEntities={this.state.maxEntities}
                                                            evidence={this.props.evidence}
                                                            autocompleteObj={this.props.autocompleteObj}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="viewer">
                                        <PhenotypeAnnotationsViewer showAnnotationIds={this.props.showAnnotationIds}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Tab.Pane> : ''}
                        {this.state.showAnatomyFunctionCuration ?
                        <Tab.Pane eventKey="anatomyFunction">
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
                                        <AnatomyFunctionAnnotator maxEntities={this.state.maxEntities}
                                                                  evidence={this.props.evidence}
                                                                  autocompleteObj={this.props.autocompleteObj}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="viewer">
                                        <AnatomyFunctionAnnotationsViewer showAnnotationIds={this.props.showAnnotationIds}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Tab.Pane> : ''}
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    storedExpressionAnnotations: getExpressionAnnotations(state),
    storedPhenotypeAnnotations: getPhenotypeAnnotations(state),
    storedAnatomyFunctionAnnotations: getAnatomyFunctionAnnotations(state),
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
