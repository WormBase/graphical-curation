import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getAnatomyTerms, getGenes, getAnatomyFunctionAssays
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "../components/EntityPicker";
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
import {entityTypes} from "../autocomplete";
import {AnnotationCreatedModal, WrongAnnotationModal} from "../components/Modals";
import RemarksEditor from "../components/RemarksEditor";
import {
    dismissSavedStatus,
    dismissWrongAnnotation,
    resetAnatomyFunctionTmpAnnotation,
    saveAnatomyFunctionTmpAnnotation,
    setAnatomyFunctionTmpAnnotationAnatomyTerms, setAnatomyFunctionTmpAnnotationAssay,
    setAnatomyFunctionTmpAnnotationAuthorStatements,
    setAnatomyFunctionTmpAnnotationEvidence,
    setAnatomyFunctionTmpAnnotationGene,
    setAnatomyFunctionTmpAnnotationGenotypes,
    setAnatomyFunctionTmpAnnotationInvolved,
    setAnatomyFunctionTmpAnnotationNoctuaModels,
    setAnatomyFunctionTmpAnnotationPhenotype,
    setAnatomyFunctionTmpAnnotationRemarks
} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {
    getAnatomyFunctionTmpAnnotation, getCurrentAnatomyFunctionAction,
    getAnatomyFunctionSavedStatus,
    getWrongAnnotation
} from "../redux/selectors/anatomyFunctionAnnotationsSelector";
import ButtonGroup from "react-bootstrap/ButtonGroup";


class AnatomyFunctionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.assayPicker = React.createRef();
    }

    resetPickers() {
        this.genePicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.assayPicker.reset();
        this.props.resetAnatomyFunctionTmpAnnotation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.savedStatus !== prevProps.savedStatus && this.props.savedStatus !== null) {
            this.resetPickers();
            setTimeout(() => this.props.dismissSavedStatus(), 2000);
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row><Col>&nbsp;</Col></Row>
                    <Row>
                        <Col sm={5}>
                            <Container fluid>
                                <Row>
                                    <Col sm={12}>
                                        <EntityPicker
                                            title={"Phenotype"}
                                            cardinality="1"
                                            tooltip="Observed phenotype."
                                            entities={this.props.phenotypeTerms}
                                            ref={instance => { this.phenoTermPicker = instance; }}
                                            selectedItemsCallback={(phenoTerm) => {
                                                this.props.setAnatomyFunctionTmpAnnotationPhenotype(phenoTerm);
                                            }}
                                            count={this.props.maxEntities}
                                            isLoading={this.props.isLoading}
                                            addEntity={this.props.addPhenotypeTerm}
                                            selectedEntities={this.props.tmpAnnotation.phenotype}
                                            autocompleteObj={this.props.autocompleteObj}
                                            entityType={entityTypes.PHENOTYPE}
                                            checkboxes={["Autonomous", "Nonautonomous"]}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <EntityPicker
                                            title={this.props.tmpAnnotation.involved === 'not_involved' ? 'Not involved tissues' : 'Involved tissues'}
                                            cardinality="1+"
                                            tooltip="The involved (or not involved) tissues."
                                            entities={this.props.anatomyTerms}
                                            ref={instance => { this.anatomyTermsPicker = instance; }}
                                            selectedItemsCallback={(anatomyTerms) => {
                                                this.props.setAnatomyFunctionTmpAnnotationAnatomyTerms(anatomyTerms);
                                            }}
                                            count={this.props.maxEntities}
                                            isLoading={this.props.isLoading}
                                            addEntity={this.props.addAnatomyTerm}
                                            checkboxes={this.props.tmpAnnotation.involved === "involved" ? ["Sufficient", "Necessary"] : ["Insufficient", "Unnecessary"]}
                                            selectedEntities={this.props.tmpAnnotation.anatomyTerms}
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
                                    <Col>
                                        <EntityPicker
                                            title={"Gene"}
                                            cardinality="0-1"
                                            tooltip="The involved gene."
                                            entities={this.props.genes}
                                            ref={instance => { this.genePicker = instance; }}
                                            selectedItemsCallback={(gene) => {
                                                this.props.setAnatomyFunctionTmpAnnotationGene(gene);
                                            }}
                                            count={this.props.maxEntities}
                                            isLoading={this.props.isLoading}
                                            addEntity={this.props.addGene}
                                            selectedEntities={this.props.tmpAnnotation.gene}
                                            autocompleteObj={this.props.autocompleteObj}
                                            entityType={entityTypes.GENE}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <EntityPicker
                                            title={"Assay"}
                                            cardinality="1"
                                            tooltip="The method used for the experiment."
                                            entities={this.props.anatomyFunctionAssays}
                                            ref={instance => { this.assayPicker = instance; }}
                                            selectedItemsCallback={(assay) => {
                                                this.props.setAnatomyFunctionTmpAnnotationAssay(assay);
                                            }}
                                            count={this.props.maxEntities}
                                            selectedEntities={this.props.tmpAnnotation.assay}
                                            isLoading={this.props.isLoading}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col sm={3}>
                            <Container fluid>
                                <Row>
                                    <Col sm={12}>
                                        <div>
                                            <h6 align="center">Involved/not involved in</h6>
                                            <FormControl as="select" value={this.props.tmpAnnotation.involved} onChange={(e) => {
                                                this.props.setAnatomyFunctionTmpAnnotationInvolved(e.target.value);
                                                this.anatomyTermsPicker.reset();
                                            }}>
                                                <option value="involved" selected>Involved</option>
                                                <option value="not_involved">Not Involved</option>
                                            </FormControl>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                            <div className="whiteSpace"/>
                                            <div align="center"><h6>Remarks</h6></div>
                                            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <Row><Col sm={12}><RemarksEditor title="General remarks"
                                                                         remarks={this.props.tmpAnnotation.remarks}
                                                                         remarksModified={(remarks) => {
                                                                             this.props.setAnatomyFunctionTmpAnnotationRemarks(remarks);
                                                                         }}
                                                /></Col></Row>
                                                <Row><Col sm={12}><RemarksEditor title="Noctua models"
                                                                         remarks={this.props.tmpAnnotation.noctuamodels}
                                                                         remarksModified={(remarks) => {
                                                                             this.props.setAnatomyFunctionTmpAnnotationNoctuaModels(remarks);
                                                                         }}
                                                /></Col></Row>
                                                <Row><Col sm={12}><RemarksEditor title="Genotypes"
                                                                         remarks={this.props.tmpAnnotation.genotypes}
                                                                         remarksModified={(remarks) => {
                                                                             this.props.setAnatomyFunctionTmpAnnotationGenotypes(remarks);
                                                                         }}
                                                /></Col></Row>
                                                <Row><Col sm={12}><RemarksEditor title="Author statements"
                                                                         remarks={this.props.tmpAnnotation.authorstatements}
                                                                         remarksModified={(remarks) => {
                                                                             this.props.setAnatomyFunctionTmpAnnotationAuthorStatements(remarks);
                                                                         }}
                                                /></Col></Row>
                                            </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} align="right">
                            <ButtonGroup>
                                <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.currentAction === 'Modify' ? 'Cancel' : 'Clear'}</Button>
                                <Button variant="success" onClick={() => {
                                    this.props.setAnatomyFunctionTmpAnnotationEvidence(this.props.evidence);
                                    this.props.saveAnatomyFunctionTmpAnnotation();
                                }}>{this.props.currentAction} Annotation</Button><br/><br/>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
                <AnnotationCreatedModal
                    show={this.props.savedStatus !== null}
                    onHide={() => this.props.dismissSavedStatus()}
                    create_modify={this.props.savedStatus}
                />
                <WrongAnnotationModal
                    show={this.props.wrongAnnotation.length > 0}
                    missingFields={this.props.wrongAnnotation}
                    onHide={() => this.props.dismissWrongAnnotation()}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    genes: getGenes(state),
    phenotypeTerms: getPhenotypeTerms(state),
    isLoading: isLoading(state),
    anatomyFunctionAssays: getAnatomyFunctionAssays(state),
    anatomyTerms: getAnatomyTerms(state),
    tmpAnnotation: getAnatomyFunctionTmpAnnotation(state),
    savedStatus: getAnatomyFunctionSavedStatus(state),
    wrongAnnotation: getWrongAnnotation(state),
    currentAction: getCurrentAnatomyFunctionAction(state)
});

export default connect(mapStateToProps, {addPhenotypeTerm, addAnatomyTerm, addGene, saveAnatomyFunctionTmpAnnotation,
    resetAnatomyFunctionTmpAnnotation, setAnatomyFunctionTmpAnnotationPhenotype, setAnatomyFunctionTmpAnnotationGene,
    setAnatomyFunctionTmpAnnotationAnatomyTerms, setAnatomyFunctionTmpAnnotationInvolved,
    setAnatomyFunctionTmpAnnotationRemarks, setAnatomyFunctionTmpAnnotationNoctuaModels,
    setAnatomyFunctionTmpAnnotationGenotypes, setAnatomyFunctionTmpAnnotationAuthorStatements,
    setAnatomyFunctionTmpAnnotationAssay, setAnatomyFunctionTmpAnnotationEvidence, dismissSavedStatus,
    dismissWrongAnnotation})(AnatomyFunctionAnnotator);
