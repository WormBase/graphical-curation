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
import FormControl from "react-bootstrap/FormControl";
import {getPhenotypeAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetPhenotypeAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";
import {AnnotationCreatedModal, WrongAnnotationModal} from "./Modals";
import {createPhenotypeAnnotation} from "../annotationUtils";


class PhenotypeAnnotator extends Component{
    constructor(props) {
        super(props);
        this.variantPicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.state = {
            tmpAnnotation: createPhenotypeAnnotation(),
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            createModify: 'Create'
        }

        this.resetPickers = this.resetPickers.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.phenotypeAnnotationForEditing !== prevProps.phenotypeAnnotationForEditing) {
            this.setState({
                tmpAnnotation: this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing : createPhenotypeAnnotation()
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
                        <EntityPicker
                            title="Variant"
                            entities={this.props.variants}
                            ref={instance => { this.variantPicker = instance; }}
                            selectedItemsCallback={(object) => {
                                let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                tmpAnnotation.object = object;
                                this.setState({tmpAnnotation: tmpAnnotation});
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
                            title="Phenotype terms"
                            entities={this.props.phenotypeTerms}
                            ref={instance => { this.phenoTermPicker = instance; }}
                            selectedItemsCallback={(phenoTerms) => {
                                let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                                tmpAnnotation.phenoTerms = phenoTerms;
                                this.setState({tmpAnnotation: tmpAnnotation});
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
                            title="Anatomy terms"
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
                            selectedEntities={this.props.phenotypeAnnotationForEditing !== null ? this.props.phenotypeAnnotationForEditing.anatomyTerms : ''}
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
                                tmpAnnotation.lifeStages = lifeStages;
                                this.setState({tmpAnnotation: tmpAnnotation});
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
                        <h6 align="center">Phenotype Statement</h6>
                        <FormControl as="textarea" rows="3" value={this.state.tmpAnnotation.phenotypeStatement} onChange={event => {
                            let tmpAnnotation = _.cloneDeep(this.state.tmpAnnotation);
                            tmpAnnotation.phenotypeStatement = event.target.value;
                            this.setState({tmpAnnotation: tmpAnnotation});
                        }}/>
                    </Col>
                    <Col align="left">
                        <Button variant="success" onClick={() => {
                            if (phenotypeAnnotationIsValid(this.state.tmpAnnotation)) {
                                if (this.props.phenotypeAnnotationForEditing !== null) {
                                    this.props.modifyPhenotypeAnnotation(this.state.tmpAnnotation);
                                } else {
                                    this.props.addPhenotypeAnnotation(this.state.tmpAnnotation);
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
