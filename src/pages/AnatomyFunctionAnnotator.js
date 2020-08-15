import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
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
import FormControl from "react-bootstrap/FormControl";
import {anatomyFunctionAnnotationIsValid} from "../redux/constraints/anatomyFunction";
import {
    addAnatomyFunctionAnnotation,
    modifyAnatomyFunctionAnnotation
} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {getAnatomyFunctionAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetAnatomyFunctionAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";
import {AnnotationCreatedModal, WrongAnnotationModal} from "./Modals";
import {createAnatomyFunctionAnnotation} from "../annotationUtils";
import RemarksEditor from "../components/RemarksEditor";


class AnatomyFunctionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.assayPicker = React.createRef();
        this.state = {
            tmpAnnotation: createAnatomyFunctionAnnotation(),
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            createModify: 'Create'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.anatomyFunctionAnnotationForEditing !== prevProps.anatomyFunctionAnnotationForEditing) {
            this.setState({
                tmpAnnotation: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing : createAnatomyFunctionAnnotation()
            });
        }
    }

    resetPickers() {
        this.genePicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.assayPicker.reset();
        this.props.unsetAnatomyFunctionAnnotationForEditing();
        this.setState({gene: '', phenoTerm: [], anatomyTerms: [], involvedOption: 'involved', remarks: [], noctuaModels: [], genotypes: [], authorStatements: []});
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
                                <Col sm={12}>
                                    <EntityPicker
                                        title={"Phenotype"}
                                        entities={this.props.phenotypeTerms}
                                        ref={instance => { this.phenoTermPicker = instance; }}
                                        selectedItemsCallback={(phenoTerm) => {
                                            let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                            tmpAnnotation.phenotype = phenoTerm;
                                            this.setState({tmpAnnotation: tmpAnnotation});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addPhenotypeTerm}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.phenotype : ''}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.PHENOTYPE}
                                        checkboxes={["Autonomous", "Nonautonomous"]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <EntityPicker
                                        title={this.state.involvedOption === 'not_involved' ? 'Not involved tissues' : 'Involved tissues'}
                                        entities={this.props.anatomyTerms}
                                        ref={instance => { this.anatomyTermsPicker = instance; }}
                                        selectedItemsCallback={(anatomyTerms) => {
                                            let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                            tmpAnnotation.anatomyTerms = anatomyTerms;
                                            this.setState({tmpAnnotation: tmpAnnotation});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addAnatomyTerm}
                                        checkboxes={this.state.involvedOption === "involved" ? ["Sufficient", "Necessary"] : ["Insufficient", "Unnecessary"]}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.anatomyTerms : ''}
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
                                <Col sm={6}>
                                    <EntityPicker
                                        title={"Gene"}
                                        entities={this.props.genes}
                                        ref={instance => { this.genePicker = instance; }}
                                        selectedItemsCallback={(gene) => {
                                            let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                            tmpAnnotation.gene = gene;
                                            this.setState({tmpAnnotation: tmpAnnotation});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addGene}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.gene : ''}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.GENE}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <h6>Involved/not involved in</h6>
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
                                <Col sm={6}>
                                    <EntityPicker
                                        title={"Assay"}
                                        entities={this.props.anatomyFunctionAssays}
                                        ref={instance => { this.assayPicker = instance; }}
                                        selectedItemsCallback={(assay) => {
                                            let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                            tmpAnnotation.assay = assay;
                                            this.setState({tmpAnnotation: tmpAnnotation});
                                        }}
                                        count={this.props.maxEntities}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.assay : ''}
                                        isLoading={this.props.isLoading}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <div align="center"><h6>Remarks</h6></div>
                                    <Container fluid>
                                        <Row><Col><RemarksEditor title="General remarks"
                                                                 remarks={this.state.tmpAnnotation.remarks}
                                                                 remarksModified={(remarks) => {
                                                                     let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                                                     tmpAnnotation.remarks = remarks;
                                                                     this.setState({tmpAnnotation: tmpAnnotation});
                                                                 }}
                                        /></Col></Row>
                                        <Row><Col><RemarksEditor title="Noctua models"
                                                                 remarks={this.state.tmpAnnotation.noctuamodels}
                                                                 remarksModified={(remarks) => {
                                                                     let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                                                     tmpAnnotation.noctuamodels = remarks;
                                                                     this.setState({tmpAnnotation: tmpAnnotation});
                                                                 }}
                                        /></Col></Row>
                                        <Row><Col><RemarksEditor title="Genotypes"
                                                                 remarks={this.state.tmpAnnotation.genotypes}
                                                                 remarksModified={(remarks) => {
                                                                     let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                                                     tmpAnnotation.genotypes = remarks;
                                                                     this.setState({tmpAnnotation: tmpAnnotation});
                                                                 }}
                                        /></Col></Row>
                                        <Row><Col><RemarksEditor title="Author statements"
                                                                 remarks={this.state.tmpAnnotation.authorstatements}
                                                                 remarksModified={(remarks) => {
                                                                     let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                                                     tmpAnnotation.authorstatements = remarks;
                                                                     this.setState({tmpAnnotation: tmpAnnotation});
                                                                 }}
                                        /></Col></Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2} align="left">
                        <Button variant="success" onClick={() => {
                            if (anatomyFunctionAnnotationIsValid(this.state.tmpAnnotation)) {
                                if (this.props.anatomyFunctionAnnotationForEditing !== null) {
                                    this.props.modifyAnatomyFunctionAnnotation(this.state.tmpAnnotation);
                                } else {
                                    this.props.addAnatomyFunctionAnnotation(this.state.tmpAnnotation);
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
                        }}>{this.props.anatomyFunctionAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Button><br/><br/>
                        <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.anatomyFunctionAnnotationForEditing !== null ? 'Cancel' : 'Clear'}</Button>
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
