import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading, getAnatomyTerms, getAssays, getGenes, getLifeStages, getCellularComponents
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {addExpressionAnnotation, modifyExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationIsValid} from "../redux/constraints/expression";
import {addGene, addAnatomyTerm, addLifeStage, addCellularComponent} from "../redux/actions/textMinedEntitiesActions";
import Modal from "react-bootstrap/Modal";
import {getExpressionAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetExpressionAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";

class ExpressionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.cellularComponentPicker = React.createRef();
        this.assayPicker = React.createRef();
        this.state = {
            gene: '',
            anatomyTerms: [],
            lifeStages: [],
            cellularComponents: [],
            assay: '',
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            createModify: 'Create'
        }
        this.resetPickers = this.resetPickers.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.expressionAnnotationForEditing !== prevProps.expressionAnnotationForEditing) {
            this.setState({
                gene: this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.gene : '',
                anatomyTerms: this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.whereExpressed : [],
                lifeStages: this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.whenExpressed : [],
                cellularComponents: this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.cellularComponent : [],
                assay: this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.assay : ''
            });
        }
    }

    resetPickers() {
        this.setState({gene: '', anatomyTerms: [], lifeStages: [], cellularComponents: [], assay: ''});
        this.genePicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
        this.assayPicker.reset();
        this.cellularComponentPicker.reset();
        this.props.unsetExpressionAnnotationForEditing();
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 align="center">Gene</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Anatomy terms</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Life stages</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Cellular Component</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Method</h6>
                    </Col>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EntityPicker
                            entities={this.props.genes}
                            ref={instance => { this.genePicker = instance; }}
                            selectedItemsCallback={(genes) => {
                                this.setState({gene: genes});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addGene}
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.gene : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.GENE}
                        />
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.anatomyTerms}
                            ref={instance => { this.anatomyTermsPicker = instance; }}
                            selectedItemsCallback={(anatomyTerms) => {
                                this.setState({anatomyTerms: anatomyTerms});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addAnatomyTerm}
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.whereExpressed : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.ANATOMY_TERM}
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.lifeStages}
                            ref={instance => { this.lifeStagesPicker = instance; }}
                            selectedItemsCallback={(lifeStages) => {
                                this.setState({lifeStages: lifeStages});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addLifeStage}
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.whenExpressed : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.LIFE_STAGE}
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.cellularComponents}
                            ref={instance => { this.cellularComponentPicker = instance; }}
                            selectedItemsCallback={(cellularComponents) => {
                                this.setState({cellularComponents: cellularComponents});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addCellularComponent}
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.cellularComponent : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.CELLULAR_COMPONENT}
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.assays}
                            ref={instance => { this.assayPicker = instance; }}
                            selectedItemsCallback={(assays) => {
                                this.setState({assay: assays});
                            }}
                            count={this.props.maxEntities}
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.assay : ''}
                            isLoading={this.props.isLoading}
                        />
                    </Col>
                    <Col align="left">
                        <Button variant="success" onClick={() => {
                            let annotation = {
                                gene: this.state.gene,
                                whenExpressed: this.state.lifeStages,
                                assay: this.state.assay,
                                evidence: this.props.evidence,
                                whereExpressed: this.state.anatomyTerms,
                                cellularComponent: this.state.cellularComponents
                            };
                            if (expressionAnnotationIsValid(annotation)) {
                                if (this.props.expressionAnnotationForEditing !== null) {
                                    annotation.annotationId = this.props.expressionAnnotationForEditing.annotationId;
                                    this.props.modifyExpressionAnnotation(annotation);
                                } else {
                                    this.props.addExpressionAnnotation(annotation);
                                }
                                this.setState({
                                    createModify: this.props.expressionAnnotationForEditing !== null ? 'Modified' : 'Created'
                                });
                                this.resetPickers();
                                this.setState({annotationCreatedShow: true});
                                setTimeout(() => this.setState({annotationCreatedShow: false}), 2000);
                            } else {
                                this.setState({wrongAnnotationShow: true});
                            }
                        }}>{this.props.expressionAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Button><br/><br/>
                        <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.expressionAnnotationForEditing !== null ? 'Cancel' : 'Clear'}</Button>
                    </Col>
                </Row>
                <AnnotationCreatedModal
                    show={this.state.annotationCreatedShow}
                    onHide={() => this.setState({annotationCreatedShow: false})}
                    create_modify={this.state.createModify}
                />
                <WrongAnnotationModal
                    show={this.state.wrongAnnotationShow}
                    onHide={() => this.setState({wrongAnnotationShow: false})}
                />
            </Container>
        );
    }
}

function AnnotationCreatedModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Annotation Successfully {props.create_modify}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function WrongAnnotationModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Invalid Annotation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    At least one gene, one anatomy term, life stage term or cellular component, and one method must be provided.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const mapStateToProps = state => ({
    genes: getGenes(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state),
    assays: getAssays(state),
    cellularComponents: getCellularComponents(state),
    isLoading: isLoading(state),
    expressionAnnotationForEditing: getExpressionAnnotationForEditing(state)
});

export default connect(mapStateToProps, {addExpressionAnnotation, addGene, addAnatomyTerm, addLifeStage,
    addCellularComponent, unsetExpressionAnnotationForEditing, modifyExpressionAnnotation})(ExpressionAnnotator);
