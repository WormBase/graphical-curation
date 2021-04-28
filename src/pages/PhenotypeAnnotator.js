import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getVariants, getAnatomyTerms, getLifeStages, getGenes, getTransgenes, getStrains
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "../components/EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
    dismissSavedStatus,
    dismissWrongAnnotation,
    resetPhenotypeTmpAnnotation,
    savePhenotypeTmpAnnotation,
    setPhenotypeTmpAnnotationAlleles,
    setPhenotypeTmpAnnotationAnatomyTerms, setPhenotypeTmpAnnotationAssay,
    setPhenotypeTmpAnnotationEvidence,
    setPhenotypeTmpAnnotationGenes,
    setPhenotypeTmpAnnotationLifeStages, setPhenotypeTmpAnnotationNotObserved,
    setPhenotypeTmpAnnotationPhenotype,
    setPhenotypeTmpAnnotationPhenotypeStatement, setPhenotypeTmpAnnotationStrains,
    setPhenotypeTmpAnnotationTransgenes
} from "../redux/actions/phenotypeAnnotationsActions";
import {
    addVariant,
    addPhenotypeTerm,
    addLifeStage,
    addAnatomyTerm,
    addGene, addTransgene, addStrain
} from "../redux/actions/textMinedEntitiesActions";
import FormControl from "react-bootstrap/FormControl";
import {entityTypes} from "../autocomplete";
import {AnnotationCreatedModal, WrongAnnotationModal} from "../components/Modals";
import {
    getCurrentPhenotypeAction,
    getPhenotypeTmpAnnotation,
    getPhenotypeSavedStatus,
    getWrongAnnotation
} from "../redux/selectors/phenotypeAnnotationsSelector";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FormCheck from "react-bootstrap/FormCheck";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {BsQuestionOctagon} from "react-icons/bs";


class PhenotypeAnnotator extends Component{
    constructor(props) {
        super(props);
        this.phenotypePicker = React.createRef();
        this.allelesPicker = React.createRef();
        this.genesPicker = React.createRef();
        this.transgenesPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.strainsPicker = React.createRef();
    }

    resetPickers() {
        this.phenotypePicker.reset();
        this.allelesPicker.reset();
        this.genesPicker.reset();
        this.transgenesPicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
        this.strainsPicker.reset();
        this.props.resetPhenotypeTmpAnnotation();
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
                    <Row>
                        <Col>
                            &nbsp;
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <EntityPicker
                                title="Phenotype"
                                cardinality="1"
                                tooltip="The observed phenotype."
                                entities={this.props.phenotypeTerms}
                                ref={instance => { this.phenotypePicker = instance; }}
                                selectedItemsCallback={(phenotype) => {
                                    this.props.setPhenotypeTmpAnnotationPhenotype(phenotype);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addPhenotypeTerm}
                                selectedEntities={this.props.tmpAnnotation.phenotype}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.PHENOTYPE}
                                sortElements={true}
                            />
                        </Col>
                        <Col>
                            <div>
                                <div align="center">
                                    <div style={{display: 'inline'}}>Assayed via&nbsp;</div>
                                    <div style={{display: 'inline'}}>
                                        <OverlayTrigger overlay={
                                            <Tooltip>Choose how phenotype was achieved, for CRISPR or other gene engineering, choose Allele</Tooltip>}>
                                            <BsQuestionOctagon />
                                        </OverlayTrigger>
                                    </div>
                                    <FormControl as="select" value={this.props.tmpAnnotation.assay} onChange={(e) => {
                                        this.props.setPhenotypeTmpAnnotationAssay(e.target.value);
                                    }}>
                                        <option value="RNAi" selected>RNAi</option>
                                        <option value="Allele">Allele</option>
                                        <option value="Overexpression">Overexpression</option>
                                        <option value="Other">Other</option>
                                    </FormControl>
                                </div>
                            </div>
                            <br/>
                            <div>
                                <FormCheck type="checkbox" checked={this.props.tmpAnnotation.notObserved} label="Not Observed"
                                           onChange={(e) => {
                                               this.props.setPhenotypeTmpAnnotationNotObserved(!this.props.tmpAnnotation.notObserved);
                                           }}/>
                            </div>
                        </Col>
                        <Col className={this.props.tmpAnnotation.assay !== "Allele" ? "d-none" : ''}>
                            <EntityPicker
                                title="Allele"
                                cardinality="1+"
                                tooltip="The involved allele(s)."
                                entities={this.props.variants}
                                ref={instance => { this.allelesPicker = instance; }}
                                selectedItemsCallback={(alleles) => {
                                    this.props.setPhenotypeTmpAnnotationAlleles(alleles);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addVariant}
                                selectedEntities={this.props.tmpAnnotation.object}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.VARIANT}
                                sortElements={true}
                                multiSelect
                            />
                        </Col>
                        <Col className={this.props.tmpAnnotation.assay === "Allele" ? "d-none" : ''}>
                            <EntityPicker
                                title="Gene"
                                cardinality="1+"
                                tooltip="The involved gene(s)."
                                entities={this.props.genes}
                                ref={instance => { this.genesPicker = instance; }}
                                selectedItemsCallback={(genes) => {
                                    this.props.setPhenotypeTmpAnnotationGenes(genes);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addGene}
                                selectedEntities={this.props.tmpAnnotation.genes}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.GENE}
                                sortElements={true}
                                multiSelect
                            />
                        </Col>
                        <Col className={this.props.tmpAnnotation.assay !== "Overexpression" ? 'd-none' : ''}>
                            <EntityPicker
                                title="Transgene"
                                cardinality="1+"
                                tooltip="The involved transgene(s)."
                                entities={this.props.transgenes}
                                ref={instance => { this.transgenesPicker = instance; }}
                                selectedItemsCallback={(transgenes) => {
                                    this.props.setPhenotypeTmpAnnotationTransgenes(transgenes);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addTransgene}
                                selectedEntities={this.props.tmpAnnotation.transgenes}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.TRANSGENE}
                                sortElements={true}
                                multiSelect
                            />
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Anatomy terms"
                                cardinality="0+"
                                tooltip="Involved anatomy terms."
                                entities={this.props.anatomyTerms}
                                ref={instance => { this.anatomyTermsPicker = instance; }}
                                selectedItemsCallback={(anatomyTerms) => {
                                    this.props.setPhenotypeTmpAnnotationAnatomyTerms(anatomyTerms);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addAnatomyTerm}
                                selectedEntities={this.props.tmpAnnotation.anatomyTerms}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.ANATOMY_TERM}
                                multiSelect
                                sortElements={true}
                            />
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Life stages"
                                cardinality="0+"
                                tooltip="Involved life stages."
                                entities={this.props.lifeStages}
                                ref={instance => { this.lifeStagesPicker = instance; }}
                                selectedItemsCallback={(lifeStages) => {
                                    this.props.setPhenotypeTmpAnnotationLifeStages(lifeStages);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addLifeStage}
                                selectedEntities={this.props.tmpAnnotation.lifeStages}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.LIFE_STAGE}
                                multiSelect
                                sortElements={true}
                            />
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Strains"
                                cardinality="0+"
                                tooltip="Strain used in assay."
                                entities={this.props.strains}
                                ref={instance => { this.strainsPicker = instance; }}
                                selectedItemsCallback={(strain) => {
                                    this.props.setPhenotypeTmpAnnotationStrains(strain);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addStrain}
                                selectedEntities={this.props.tmpAnnotation.strains}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.STRAIN}
                                multiSelect
                                sortElements={true}
                            />
                        </Col>
                        <Col>
                            <h6 align="center">Phenotype Statement</h6>
                            <FormControl as="textarea" rows="3" value={this.props.tmpAnnotation.phenotypeStatement} onChange={event => {
                                this.props.setPhenotypeTmpAnnotationPhenotypeStatement(event.target.value);
                            }}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} align="right">
                            <ButtonGroup>
                                <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.currentAction === 'Modify' ? 'Cancel' : 'Clear'}</Button>
                                <Button variant="success" onClick={() => {
                                    this.props.setPhenotypeTmpAnnotationEvidence(this.props.evidence);
                                    this.props.savePhenotypeTmpAnnotation();
                                }}>{this.props.currentAction}  Annotation</Button><br/><br/>
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
    variants: getVariants(state),
    phenotypeTerms: getPhenotypeTerms(state),
    isLoading: isLoading(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state),
    genes: getGenes(state),
    strains: getStrains(state),
    transgenes: getTransgenes(state),
    tmpAnnotation: getPhenotypeTmpAnnotation(state),
    savedStatus: getPhenotypeSavedStatus(state),
    wrongAnnotation: getWrongAnnotation(state),
    currentAction: getCurrentPhenotypeAction(state)
});

export default connect(mapStateToProps, {addVariant, addPhenotypeTerm, addAnatomyTerm, addLifeStage, addGene,
    addTransgene, savePhenotypeTmpAnnotation, resetPhenotypeTmpAnnotation, setPhenotypeTmpAnnotationPhenotype,
    setPhenotypeTmpAnnotationAlleles, setPhenotypeTmpAnnotationAnatomyTerms, setPhenotypeTmpAnnotationLifeStages,
    setPhenotypeTmpAnnotationPhenotypeStatement, setPhenotypeTmpAnnotationEvidence, dismissSavedStatus,
    setPhenotypeTmpAnnotationGenes, setPhenotypeTmpAnnotationTransgenes, dismissWrongAnnotation,
    setPhenotypeTmpAnnotationNotObserved, setPhenotypeTmpAnnotationAssay, setPhenotypeTmpAnnotationStrains, addStrain})(PhenotypeAnnotator);
