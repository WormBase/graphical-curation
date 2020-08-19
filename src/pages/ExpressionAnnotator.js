import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading, getAnatomyTerms, getAssays, getGenes, getLifeStages, getCellularComponents
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "../components/EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {addGene, addAnatomyTerm, addLifeStage, addCellularComponent} from "../redux/actions/textMinedEntitiesActions";
import {entityTypes} from "../autocomplete";
import {AnnotationCreatedModal, WrongAnnotationModal} from "../components/Modals";
import {
    resetExpressionTmpAnnotation,
    saveExpressionTmpAnnotation,
    setExpressionTmpAnnotationAssay,
    setExpressionTmpAnnotationCellularComponents, setExpressionTmpAnnotationEvidence, setExpressionTmpAnnotationGene,
    setExpressionTmpAnnotationWhenExpressed,
    setExpressionTmpAnnotationWhereExpressed
} from "../redux/actions/expressionAnnotationsActions";
import {dismissSavedStatus, dismissWrongAnnotation} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {
    getCurrentExpressionAction,
    getExpressionTmpAnnotation,
    getExpressionSavedStatus,
    getWrongAnnotation
} from "../redux/selectors/expressionAnnotationsSelector";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class ExpressionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.cellularComponentPicker = React.createRef();
        this.assayPicker = React.createRef();
    }

    resetPickers() {
        this.genePicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
        this.assayPicker.reset();
        this.cellularComponentPicker.reset();
        this.props.resetExpressionTmpAnnotation();
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
                                title="Gene"
                                entities={this.props.genes}
                                ref={instance => { this.genePicker = instance; }}
                                selectedItemsCallback={(gene) => {
                                    this.props.setExpressionTmpAnnotationGene(gene);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addGene}
                                selectedEntities={this.props.tmpAnnotation.gene}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.GENE}
                            />
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Anatomy terms"
                                entities={this.props.anatomyTerms}
                                ref={instance => { this.anatomyTermsPicker = instance; }}
                                selectedItemsCallback={(anatomyTerms) => {
                                    this.props.setExpressionTmpAnnotationWhereExpressed(anatomyTerms);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addAnatomyTerm}
                                selectedEntities={this.props.tmpAnnotation.whereExpressed}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.ANATOMY_TERM}
                                multiSelect/>
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Life stages"
                                entities={this.props.lifeStages}
                                ref={instance => { this.lifeStagesPicker = instance; }}
                                selectedItemsCallback={(lifeStages) => {
                                    this.props.setExpressionTmpAnnotationWhenExpressed(lifeStages);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addLifeStage}
                                selectedEntities={this.props.tmpAnnotation.whenExpressed}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.LIFE_STAGE}
                                multiSelect/>
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Cellular components"
                                entities={this.props.cellularComponents}
                                ref={instance => { this.cellularComponentPicker = instance; }}
                                selectedItemsCallback={(cellularComponents) => {
                                    this.props.setExpressionTmpAnnotationCellularComponents(cellularComponents);
                                }}
                                count={this.props.maxEntities}
                                isLoading={this.props.isLoading}
                                addEntity={this.props.addCellularComponent}
                                selectedEntities={this.props.tmpAnnotation.cellularComponent}
                                autocompleteObj={this.props.autocompleteObj}
                                entityType={entityTypes.CELLULAR_COMPONENT}
                                multiSelect/>
                        </Col>
                        <Col>
                            <EntityPicker
                                title="Method"
                                entities={this.props.assays}
                                ref={instance => { this.assayPicker = instance; }}
                                selectedItemsCallback={(assay) => {
                                    this.props.setExpressionTmpAnnotationAssay(assay);
                                }}
                                count={this.props.maxEntities}
                                selectedEntities={this.props.tmpAnnotation.assay}
                                isLoading={this.props.isLoading}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} align="right">
                            <ButtonGroup>
                                <Button variant="success" onClick={() => {
                                    this.props.setExpressionTmpAnnotationEvidence(this.props.evidence);
                                    this.props.saveExpressionTmpAnnotation();
                                }}>{this.props.currentAction}  Annotation</Button><br/><br/>
                                <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.currentAction === 'Modify' ? 'Cancel' : 'Clear'}</Button>
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
                    show={this.props.wrongAnnotation === true}
                    onHide={() => this.props.dismissWrongAnnotation()}
                />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    genes: getGenes(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state),
    assays: getAssays(state),
    cellularComponents: getCellularComponents(state),
    isLoading: isLoading(state),
    tmpAnnotation: getExpressionTmpAnnotation(state),
    savedStatus: getExpressionSavedStatus(state),
    wrongAnnotation: getWrongAnnotation(state),
    currentAction: getCurrentExpressionAction(state)
});

export default connect(mapStateToProps, {addGene, addAnatomyTerm, addLifeStage,
    addCellularComponent, saveExpressionTmpAnnotation, resetExpressionTmpAnnotation, setExpressionTmpAnnotationGene,
    setExpressionTmpAnnotationWhenExpressed, setExpressionTmpAnnotationWhereExpressed,
    setExpressionTmpAnnotationCellularComponents, setExpressionTmpAnnotationAssay, setExpressionTmpAnnotationEvidence,
    dismissSavedStatus, dismissWrongAnnotation})(ExpressionAnnotator);
