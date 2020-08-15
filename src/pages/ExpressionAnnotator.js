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
import {getExpressionAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetExpressionAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";
import {AnnotationCreatedModal, WrongAnnotationModal} from "./Modals";
import {createExpressionAnnotation} from "../annotationUtils";

class ExpressionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.cellularComponentPicker = React.createRef();
        this.assayPicker = React.createRef();
        this.state = {
            tmpAnnotation: createExpressionAnnotation(),
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            createModify: 'Create'
        }
        this.resetPickers = this.resetPickers.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.expressionAnnotationForEditing !== prevProps.expressionAnnotationForEditing) {
            this.setState({
                tmpAnnotation: this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing : createExpressionAnnotation()
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
                        <EntityPicker
                            title="Gene"
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
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.gene : ''}
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
                                let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                tmpAnnotation.whereExpressed = anatomyTerms;
                                this.setState({tmpAnnotation: tmpAnnotation});
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
                            title="Life stages"
                            entities={this.props.lifeStages}
                            ref={instance => { this.lifeStagesPicker = instance; }}
                            selectedItemsCallback={(lifeStages) => {
                                let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                tmpAnnotation.whenExpressed = lifeStages;
                                this.setState({tmpAnnotation: tmpAnnotation});
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
                            title="Cellular components"
                            entities={this.props.cellularComponents}
                            ref={instance => { this.cellularComponentPicker = instance; }}
                            selectedItemsCallback={(cellularComponents) => {
                                let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                tmpAnnotation.cellularComponent = cellularComponents;
                                this.setState({tmpAnnotation: tmpAnnotation});
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
                            title="Method"
                            entities={this.props.assays}
                            ref={instance => { this.assayPicker = instance; }}
                            selectedItemsCallback={(assay) => {
                                let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                tmpAnnotation.assay = assay;
                                this.setState({tmpAnnotation: tmpAnnotation});
                            }}
                            count={this.props.maxEntities}
                            selectedEntities={this.props.expressionAnnotationForEditing !== null ? this.props.expressionAnnotationForEditing.assay : ''}
                            isLoading={this.props.isLoading}
                        />
                    </Col>
                    <Col align="left">
                        <Button variant="success" onClick={() => {
                            console.log(this.state.tmpAnnotation);
                            if (expressionAnnotationIsValid(this.state.tmpAnnotation)) {
                                if (this.props.expressionAnnotationForEditing !== null) {
                                    this.props.modifyExpressionAnnotation(this.state.tmpAnnotation);
                                } else {
                                    this.props.addExpressionAnnotation(this.state.tmpAnnotation);
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
