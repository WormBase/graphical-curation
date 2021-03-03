import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getVariants, getAnatomyTerms, getLifeStages
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "../components/EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
    dismissSavedStatus, dismissWrongAnnotation,
    resetPhenotypeTmpAnnotation,
    savePhenotypeTmpAnnotation,
    setPhenotypeTmpAnnotationAnatomyTerms, setPhenotypeTmpAnnotationEvidence, setPhenotypeTmpAnnotationLifeStages,
    setPhenotypeTmpAnnotationObject, setPhenotypeTmpAnnotationPhenotypeStatement,
    setPhenotypeTmpAnnotationPhenotypeTerms
} from "../redux/actions/phenotypeAnnotationsActions";
import {addVariant, addPhenotypeTerm, addLifeStage, addAnatomyTerm} from "../redux/actions/textMinedEntitiesActions";
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


class PhenotypeAnnotator extends Component{
    constructor(props) {
        super(props);
        this.variantPicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
    }

    resetPickers() {
        this.variantPicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
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
                                title="Variant"
                                cardinality="1"
                                tooltip="The involved variant."
                                entities={this.props.variants}
                                ref={instance => { this.variantPicker = instance; }}
                                selectedItemsCallback={(object) => {
                                    this.props.setPhenotypeTmpAnnotationObject(object);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addVariant}
                                selectedEntities={this.props.tmpAnnotation.object}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.VARIANT}
                                sortElements={true}
                            />
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Phenotype terms"
                                cardinality="1+"
                                tooltip="The observed phenotype(s)."
                                entities={this.props.phenotypeTerms}
                                ref={instance => { this.phenoTermPicker = instance; }}
                                selectedItemsCallback={(phenoTerms) => {
                                    this.props.setPhenotypeTmpAnnotationPhenotypeTerms(phenoTerms);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addPhenotypeTerm}
                                selectedEntities={this.props.tmpAnnotation.phenotypeTerms}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.PHENOTYPE}
                                multiSelect
                                sortElements={true}
                            />
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Anatomy terms"
                                cardinality="0+"
                                tooltip="Involved anatomy terms. At least one anatomy term or life stage must be provided."
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
                                tooltip="Involved life stages. At least one anatomy term or life stage must be provided."
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
    tmpAnnotation: getPhenotypeTmpAnnotation(state),
    savedStatus: getPhenotypeSavedStatus(state),
    wrongAnnotation: getWrongAnnotation(state),
    currentAction: getCurrentPhenotypeAction(state)
});

export default connect(mapStateToProps, {addVariant, addPhenotypeTerm, addAnatomyTerm, addLifeStage,
    savePhenotypeTmpAnnotation, resetPhenotypeTmpAnnotation, setPhenotypeTmpAnnotationObject,
    setPhenotypeTmpAnnotationPhenotypeTerms, setPhenotypeTmpAnnotationAnatomyTerms, setPhenotypeTmpAnnotationLifeStages,
    setPhenotypeTmpAnnotationPhenotypeStatement, setPhenotypeTmpAnnotationEvidence, dismissSavedStatus,
    dismissWrongAnnotation})(PhenotypeAnnotator);
