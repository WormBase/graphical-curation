import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getVariants, getAnatomyTerms, getLifeStages
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {addPhenotypeAnnotation, modifyPhenotypeAnnotation} from "../redux/actions/phenotypeAnnotationsActions";
import {phenotypeAnnotationIsValid} from "../redux/constraints/phenotype";
import {addVariant, addPhenotypeTerm, addLifeStage, addAnatomyTerm} from "../redux/actions/textMinedEntitiesActions";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import {getPhenotypeAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetPhenotypeAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";


class PhenotypeAnnotator extends Component{
    constructor(props) {
        super(props);
        this.variantPicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.state = {
            variant: '',
            phenoTerms: [],
            anatomyTerms: [],
            lifeStages: [],
            phenotypeStatement: '',
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            preselectedId: undefined,
            preselectedVariant: undefined,
            preselectedPhenoTerms: undefined,
            preselectedAnatomyTerms: undefined,
            preselectedLifeStages: undefined,
            createModify: 'Create'
        }

        this.resetPickers = this.resetPickers.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.phenotypeAnnotationForEditing !== prevProps.phenotypeAnnotationForEditing) {
            this.setState({
                variant: this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.object : '',
                anatomyTerms: this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.anatomyTerms : [],
                lifeStages: this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.lifeStages : [],
                phenoTerms: this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.phenotypeTerms : [],
                phenotypeStatement: this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.phenotypeStatement : ''
            });
        }
    }

    resetPickers() {
        this.setState({variant: '', phenoTerms: [], anatomyTerms: [], lifeStages: [], phenotypeStatement: ''});
        this.variantPicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
        this.props.unsetPhenotypeAnnotationForEditing();
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
                        <h6 align="center">Variant</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Phenotype Terms</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Anatomy Terms</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Life Stages</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Phenotype Statement</h6>
                    </Col>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EntityPicker
                            entities={this.props.variants}
                            ref={instance => { this.variantPicker = instance; }}
                            selectedItemsCallback={(variants) => {
                                this.setState({variant: variants});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addVariant}
                            selectedEntities={this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.object : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.VARIANT}
                        />
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.phenotypeTerms}
                            ref={instance => { this.phenoTermPicker = instance; }}
                            selectedItemsCallback={(phenoTerms) => {
                                this.setState({phenoTerms: phenoTerms});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addPhenotypeTerm}
                            selectedEntities={this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.phenotypeTerms : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.PHENOTYPE}
                            multiSelect/>
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
                            selectedEntities={this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.anatomyTerms : ''}
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
                            selectedEntities={this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.lifeStages : ''}
                            autocompleteObj={this.props.autocompleteObj}
                            entityType={entityTypes.LIFE_STAGE}
                            multiSelect/>
                    </Col>
                    <Col>
                        <FormControl as="textarea" rows="3" value={this.state.phenotypeStatement} onChange={event =>
                            this.setState({phenotypeStatement: event.target.value})}/>
                    </Col>
                    <Col align="left">
                        <Button variant="success" onClick={() => {
                            let annotation = {
                                object: this.state.variant,
                                phenotypeTerms: this.state.phenoTerms,
                                anatomyTerms: this.state.anatomyTerms,
                                lifeStages: this.state.lifeStages,
                                phenotypeStatement: this.state.phenotypeStatement,
                                evidence: this.props.evidence
                            };
                            if (phenotypeAnnotationIsValid(annotation)) {
                                if (this.props.phenotypeAnnotationForEditing !== null) {
                                    annotation.annotationId = this.props.phenotypeAnnotationForEditing.annotationId;
                                    this.props.modifyPhenotypeAnnotation(annotation);
                                } else {
                                    this.props.addPhenotypeAnnotation(annotation);
                                }
                                this.setState({
                                    createModify: this.props.phenotypeAnnotationForEditing !== null ? 'Modified' : 'Created'
                                });
                                this.resetPickers();
                                this.setState({annotationCreatedShow: true});
                                setTimeout(() => this.setState({annotationCreatedShow: false}), 2000);
                            } else {
                                this.setState({wrongAnnotationShow: true});
                            }
                        }}>{this.props.phenotypeAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Button><br/><br/>
                        <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.phenotypeAnnotationForEditing !== null ? 'Cancel' : 'Clear'}</Button>
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
                    Annotation Successfully {props.create_modify}.
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
                    At least one variant, one or more phenotype terms, and one or more anatomy terms or life stages
                    must be provided.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const mapStateToProps = state => ({
    variants: getVariants(state),
    phenotypeTerms: getPhenotypeTerms(state),
    isLoading: isLoading(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state),
    phenotypeAnnotationForEditing: getPhenotypeAnnotationForEditing(state)
});

export default connect(mapStateToProps, {addPhenotypeAnnotation, addVariant, addPhenotypeTerm, addAnatomyTerm,
    addLifeStage, unsetPhenotypeAnnotationForEditing, modifyPhenotypeAnnotation})(PhenotypeAnnotator);
