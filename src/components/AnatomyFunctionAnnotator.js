import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getAnatomyTerms, getGenes, getAnatomyFunctionAssays
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
    addPhenotypeTerm,
    addAnatomyTerm,
    addGene
} from "../redux/actions/textMinedEntitiesActions";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import {anatomyFunctionAnnotationIsValid} from "../redux/constraints/anatomyFunction";
import {
    addAnatomyFunctionAnnotation,
    modifyAnatomyFunctionAnnotation
} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {getAnatomyFunctionAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetAnatomyFunctionAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";


class AnatomyFunctionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.assayPicker = React.createRef();
        this.state = {
            phenoTerm: '',
            genes: [],
            involvedOption: 'involved',
            assay: '',
            anatomyTerms: [],
            remark: '',
            noctuaModel: '',
            genotype: '',
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            preselectedId: undefined,
            preselectedPhenoTerm: undefined,
            preselectedGenes: undefined,
            preselectedAnatomyTerms: undefined,
            preselectedAssay: undefined,
            createModify: 'Create'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.anatomyFunctionAnnotationForEditing !== prevProps.anatomyFunctionAnnotationForEditing) {
            let preselectedPhenoTerm = undefined;
            let preselectedGenes = undefined;
            let preselectedAnatomyTerms = undefined;
            let preselectedAssay = undefined;
            if (this.props.anatomyFunctionAnnotationForEditing !== null) {
                preselectedGenes = new Map();
                preselectedPhenoTerm = new Map();
                preselectedAnatomyTerms = new Map();
                preselectedAssay = new Map();
                preselectedAssay.set(this.props.anatomyFunctionAnnotationForEditing.assay, new Map());
                this.props.anatomyFunctionAnnotationForEditing.anatomyTerms.forEach(a => preselectedAnatomyTerms.set({value: a.value, modId: a.modId}, new Map(Object.entries(a.options))));
                this.props.anatomyFunctionAnnotationForEditing.genes.forEach(a => preselectedGenes.set(a, new Map()));
                preselectedPhenoTerm.set({value: this.props.anatomyFunctionAnnotationForEditing.phenotype.value, modId: this.props.anatomyFunctionAnnotationForEditing.phenotype.modId}, new Map(Object.entries(this.props.anatomyFunctionAnnotationForEditing.phenotype.options)));
            }
            this.setState({
                preselectedId: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.annotationId : undefined,
                preselectedGenes: preselectedGenes,
                preselectedAnatomyTerms: preselectedAnatomyTerms,
                preselectedPhenoTerm: preselectedPhenoTerm,
                preselectedAssay: preselectedAssay,
                genes: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.genes : [],
                phenoTerm: preselectedPhenoTerm !== undefined ? preselectedPhenoTerm : new Map(),
                anatomyTerms: preselectedAnatomyTerms !== undefined ? preselectedAnatomyTerms : new Map(),
                remark: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.remark : '',
                noctuaModel: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.noctuaModel : '',
                genotype: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.genotype : '',
                involvedOption: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.involved : 'involved',
                assay: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.assay : ''
            });
        }
    }

    resetPickers() {
        this.genePicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.assayPicker.reset();
        this.props.unsetAnatomyFunctionAnnotationForEditing();
        this.setState({genes: [], phenoTerm: [], anatomyTerms: [], involvedOption: 'involved', remark: '', noctuaModel: '', genotype: ''});
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
                    <Col sm={6}>
                        <Container fluid>
                            <Row>
                                <Col sm={12}><h6 align="center">Phenotype</h6></Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <EntityPicker
                                        entities={this.props.phenotypeTerms}
                                        ref={instance => { this.phenoTermPicker = instance; }}
                                        selectedItemsCallback={(phenoTerms) => {
                                            this.setState({phenoTerm: phenoTerms});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addPhenotypeTerm}
                                        selectedEntities={this.state.preselectedPhenoTerm}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.PHENOTYPE}
                                        checkboxes={["Autonomous", "Nonautonomous"]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}><h6 align="center">{this.state.involvedOption === "not_involved" ? 'Not ' : ''}Involved Tissue</h6></Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <EntityPicker
                                        entities={this.props.anatomyTerms}
                                        ref={instance => { this.anatomyTermsPicker = instance; }}
                                        selectedItemsCallback={(anatomyTerms) => {
                                            this.setState({anatomyTerms: anatomyTerms});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addAnatomyTerm}
                                        checkboxes={this.state.involvedOption === "involved" ? ["Sufficient", "Necessary"] : ["Insufficient", "Unnecessary"]}
                                        selectedEntities={this.state.preselectedAnatomyTerms}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.ANATOMY_TERM}
                                        multiSelect/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={4}>
                        <Container fluid>
                            <Row>
                                <Col sm={6}><h6 align="center">Genes</h6></Col>
                                <Col sm={6}><h6 align="center">Involved/Not Involved in</h6></Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <EntityPicker
                                        entities={this.props.genes}
                                        ref={instance => { this.genePicker = instance; }}
                                        selectedItemsCallback={(genes) => {
                                            this.setState({genes: [...genes.keys()]});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addGene}
                                        selectedEntities={this.state.preselectedGenes}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.GENE}
                                        multiSelect
                                    />
                                </Col>
                                <Col sm={6}>
                                    <FormControl as="select" value={this.state.involvedOption} onChange={(e) => {
                                        this.setState({involvedOption: e.target.value});
                                        this.anatomyTermsPicker.reset();
                                    }}>
                                        <option value="involved" selected>Involved</option>
                                        <option value="not_involved">Not Involved</option>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}><h6 align="center">Assay</h6></Col>
                                <Col sm={6}><h6 align="center">Remarks</h6></Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <EntityPicker
                                        entities={this.props.anatomyFunctionAssays}
                                        ref={instance => { this.assayPicker = instance; }}
                                        selectedItemsCallback={(assays) => {
                                            this.setState({assay: assays.size > 0 ? assays.keys().next().value : ''});
                                        }}
                                        count={this.props.maxEntities}
                                        selectedEntities={this.state.preselectedAssay}
                                        isLoading={this.props.isLoading}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <h7 align="center">Remark</h7>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormControl as="textarea" rows="3" value={this.state.remark} onChange={event =>
                                                    this.setState({remark: event.target.value})}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                &nbsp;
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h7 align="center">Noctua Model</h7>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormControl as="textarea" rows="3" value={this.state.noctuaModel} onChange={event =>
                                                    this.setState({noctuaModel: event.target.value})}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                &nbsp;
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h7 align="center">Genotype</h7>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormControl as="textarea" rows="3" value={this.state.genotype} onChange={event =>
                                                    this.setState({genotype: event.target.value})}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2} align="left">
                        <Button variant="success" onClick={() => {
                            let annotation = {
                                assay: this.state.assay,
                                phenotype: this.state.phenoTerm.size > 0 ? Array.from(this.state.phenoTerm).map(([key, value]) => {return {value: key.value, modId: key.modId, options: Object.fromEntries(value)}})[0] : '',
                                genes: this.state.genes,
                                anatomyTerms: Array.from(this.state.anatomyTerms).map(([key, value]) => {return {value: key.value, modId: key.modId, options: Object.fromEntries(value)}}),
                                evidence: this.props.evidence,
                                remark: this.state.remark,
                                noctuamodel: this.state.noctuaModel,
                                genotype: this.state.genotype,
                                involved: this.state.involvedOption
                            };
                            if (anatomyFunctionAnnotationIsValid(annotation)) {
                                if (this.state.preselectedId !== undefined) {
                                    annotation.annotationId = this.state.preselectedId;
                                    this.props.modifyAnatomyFunctionAnnotation(annotation);
                                } else {
                                    this.props.addAnatomyFunctionAnnotation(annotation);
                                }
                                this.setState({
                                    createModify: this.props.anatomyFunctionAnnotationForEditing !== null ? 'Modified' : 'Created'
                                });
                                this.resetPickers();
                                this.setState({annotationCreatedShow: true});
                                setTimeout(() => this.setState({annotationCreatedShow: false}), 2000);
                            } else {
                                this.setState({wrongAnnotationShow: true});
                            }
                        }}>{this.state.preselectedId === undefined ? 'Create' : 'Modify'} Annotation</Button><br/><br/>
                        <Button variant="danger" onClick={()=> this.resetPickers()}>{this.state.preselectedId === undefined ? 'Clear' : 'Cancel'}</Button>
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
                    Annotation does not meet constraints.
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
    phenotypeTerms: getPhenotypeTerms(state),
    isLoading: isLoading(state),
    anatomyFunctionAssays: getAnatomyFunctionAssays(state),
    anatomyTerms: getAnatomyTerms(state),
    anatomyFunctionAnnotationForEditing: getAnatomyFunctionAnnotationForEditing(state)
});

export default connect(mapStateToProps, {addPhenotypeTerm, addAnatomyTerm, addGene, addAnatomyFunctionAnnotation,
    modifyAnatomyFunctionAnnotation, unsetAnatomyFunctionAnnotationForEditing})(AnatomyFunctionAnnotator);
