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
import {addPhenotypeAnnotation} from "../redux/actions/phenotypeAnnotationsActions";
import {phenotypeAnnotationIsValid} from "../redux/constraints/phenotype";
import {addVariant, addPhenotypeTerm, addLifeStage, addAnatomyTerm} from "../redux/actions/textMinedEntitiesActions";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";


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
            wrongAnnotationShow: false
        }

        this.resetPickers = this.resetPickers.bind(this);
    }

    resetPickers() {
        this.variantPicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
        this.setState({variant: '', phenoTerms: [], anatomyTerms: [], lifeStages: [], phenotypeStatement: ''});
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
                                this.setState({variant: variants.size > 0 ? variants.keys().next().value : ''});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addVariant}
                        />
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.phenotypeTerms}
                            ref={instance => { this.phenoTermPicker = instance; }}
                            selectedItemsCallback={(phenoTerms) => {
                                this.setState({phenoTerms: [...phenoTerms.keys()]});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addPhenotypeTerm}
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.anatomyTerms}
                            ref={instance => { this.anatomyTermsPicker = instance; }}
                            selectedItemsCallback={(anatomyTerms) => {
                                this.setState({anatomyTerms: [...anatomyTerms.keys()]});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addAnatomyTerm}
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.lifeStages}
                            ref={instance => { this.lifeStagesPicker = instance; }}
                            selectedItemsCallback={(lifeStages) => {
                                this.setState({lifeStages: [...lifeStages.keys()]});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addLifeStage}
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
                                evidence: ''
                            };
                            if (phenotypeAnnotationIsValid(annotation)) {
                                this.props.addPhenotypeAnnotation(annotation);
                                this.resetPickers();
                                this.setState({annotationCreatedShow: true});
                                setTimeout(() => this.setState({annotationCreatedShow: false}), 2000);
                            } else {
                                this.setState({wrongAnnotationShow: true});
                            }
                        }}>Create Annotation</Button><br/><br/>
                        <Button variant="danger" onClick={()=> this.resetPickers()}>Clear</Button>
                    </Col>
                </Row>
                <AnnotationCreatedModal
                    show={this.state.annotationCreatedShow}
                    onHide={() => this.setState({annotationCreatedShow: false})}
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
                    Annotation Successfully Created.
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
    lifeStages: getLifeStages(state)
});

export default connect(mapStateToProps, {addPhenotypeAnnotation, addVariant, addPhenotypeTerm, addAnatomyTerm,
    addLifeStage})(PhenotypeAnnotator);
