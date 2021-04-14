import React, {Component} from 'react';
import ExpressionAnnotator from "./ExpressionAnnotator";
import ExpressionAnnotationsViewer from "./ExpressionAnnotationsViewer";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Tab from "react-bootstrap/Tab";
import {fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError} from "../redux/actions/textMinedEntitiesActions";
import {
    getCurrentExpressionAction,
    getExpressionAnnotations,
    getExpressionSavedStatus
} from "../redux/selectors/expressionAnnotationsSelector";
import {setExpressionAnnotations} from "../redux/actions/expressionAnnotationsActions";
import PhenotypeAnnotator from "./PhenotypeAnnotator";
import PhenotypeAnnotationsViewer from "./PhenotypeAnnotationsViewer";
import {setPhenotypeAnnotations} from "../redux/actions/phenotypeAnnotationsActions";
import AnatomyFunctionAnnotator from "./AnatomyFunctionAnnotator";
import AnatomyFunctionAnnotationsViewer from "./AnatomyFunctionAnnotationsViewer";
import {
    getCurrentPhenotypeAction,
    getPhenotypeAnnotations,
    getPhenotypeSavedStatus
} from "../redux/selectors/phenotypeAnnotationsSelector";
import {
    getActiveAnnotationType,
    getActiveView
} from "../redux/selectors/internalStateSelector";
import {
    setActiveAnnotationType,
    setActiveView,
} from "../redux/actions/internalStateActions";
import Nav from "react-bootstrap/Nav";
import {setAnatomyFunctionAnnotations} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {
    getAnatomyFunctionAnnotations, getAnatomyFunctionSavedStatus,
    getCurrentAnatomyFunctionAction
} from "../redux/selectors/anatomyFunctionAnnotationsSelector";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IoIosWarning } from 'react-icons/io';
import Tooltip from "react-bootstrap/Tooltip";
import { instanceOf } from 'prop-types';
import {withCookies, Cookies} from "react-cookie";
import {TutorialModal} from "../components/Modals";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class GraphicalCuration extends Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            showExpressionCuration: true,
            showPhenotypeCuration: true,
            showAnatomyFunctionCuration: true,
            maxEntities: 5,
            modified: false,
            showTutorial: cookies.get('showTutorial') || 'true'
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
        if (this.props.anatomyFunctionSavedStatus !== prevProps.anatomyFunctionSavedStatus && this.props.anatomyFunctionSavedStatus !== null || this.props.expressionSavedStatus !== prevProps.expressionSavedStatus && this.props.expressionSavedStatus !== null || this.props.phenotypeSavedStatus !== prevProps.phenotypeSavedStatus && this.props.phenotypeSavedStatus !== null) {
            this.setState({modified: true});
        }
    }

    render() {
        return (
            <div>
                <Tab.Container activeKey={this.props.activeAnnotationType}>
                    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                            <Col sm={10}>
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
                                        &nbsp;&nbsp;
                                        <OverlayTrigger placement="right" overlay={
                                            <Tooltip>
                                                Click here to save annotations to persistent storage
                                            </Tooltip>}>
                                            <Button variant={this.state.modified ? "outline-warning" : "outline-success"} onClick={
                                                () => {
                                                    this.props.annotationsSaved({expression: this.props.storedExpressionAnnotations,
                                                        phenotype: this.props.storedPhenotypeAnnotations, anatomyFunction: this.props.storedAnatomyFunctionAnnotations });
                                                    this.setState({modified: false});
                                                }}>
                                                Save All Changes {this.state.modified ? <IoIosWarning /> : ''}
                                            </Button>
                                        </OverlayTrigger>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={2} align="right">
                                <Button size="sm" variant={"link"} onClick={() => { this.setState({showTutorial: 'true'}) }}>
                                    Show Tutorial
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Tab.Content>
                        <br/>
                        {this.state.showExpressionCuration ?
                            <Tab.Pane eventKey="expression">
                                <Tab.Container activeKey={this.props.activeView}>
                                    <Nav variant="tabs" defaultActiveKey="references">
                                        <Nav.Item>
                                            <Nav.Link eventKey="annotator" onClick={() => this.props.setActiveView("annotator")}>{this.props.currentExpressionAction} Annotation</Nav.Link>
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
                                            <Nav.Link eventKey="annotator" onClick={() => this.props.setActiveView("annotator")}>{this.props.currentPhenotypeAction} Annotation</Nav.Link>
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
                                            <Nav.Link eventKey="annotator" onClick={() => this.props.setActiveView("annotator")}>{this.props.currentAnatomyFunctionAction} Annotation</Nav.Link>
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
                <TutorialModal
                    show={this.state.showTutorial === 'true'}
                    onHide={() => this.setState({showTutorial: false})}
                    setShowTutorial={(show) => {
                        const { cookies } = this.props;
                        cookies.set('showTutorial', show, { path: '/' });
                    }}
                />
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
    currentAnatomyFunctionAction: getCurrentAnatomyFunctionAction(state),
    currentExpressionAction: getCurrentExpressionAction(state),
    currentPhenotypeAction: getCurrentPhenotypeAction(state),
    anatomyFunctionSavedStatus: getAnatomyFunctionSavedStatus(state),
    expressionSavedStatus: getExpressionSavedStatus(state),
    phenotypeSavedStatus: getPhenotypeSavedStatus(state)
});

export default connect(mapStateToProps, {
    fetchEntitiesRequest, fetchEntitiesSuccess, fetchEntitiesError, setExpressionAnnotations,
    setPhenotypeAnnotations, setAnatomyFunctionAnnotations, setActiveAnnotationType, setActiveView})(withCookies(GraphicalCuration));
