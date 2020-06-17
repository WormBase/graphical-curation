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
import {addExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationIsValid} from "../redux/constraints/expression";
import {addGene, addAnatomyTerm, addLifeStage, addCellularComponent} from "../redux/actions/textMinedEntitiesAction";
import Modal from "react-bootstrap/Modal";

class ExpressionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.cellularComponentPicker = React.createRef();
        this.assayPicker = React.createRef();
        this.state = {
            gene: '',
            anatomyTerms: [],
            lifeStages: [],
            cellularComponents: [],
            assay: '',
            annotationCreatedShow: false,
            wrongAnnotationShow: false
        }

        this.resetPickers = this.resetPickers.bind(this);
    }

    resetPickers() {
        this.genePicker.reset();
        this.anatomyTermsPicker.reset();
        this.lifeStagesPicker.reset();
        this.assayPicker.reset();
        this.cellularComponentPicker.reset();
        this.setState({gene: '', anatomyTerms: [], lifeStages: [], cellularComponents: [], assay: ''});
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
                        <h6 align="center">Gene</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Anatomy terms</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Life stages</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Cellular Component</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Method</h6>
                    </Col>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EntityPicker
                            entities={this.props.genes}
                            ref={instance => { this.genePicker = instance; }}
                            selectedItemsCallback={(genes) => {
                                this.setState({gene: genes.length > 0 ? genes[0] : ''});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addGene}
                        />
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
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.cellularComponents}
                            ref={instance => { this.cellularComponentPicker = instance; }}
                            selectedItemsCallback={(cellularComponents) => {
                                this.setState({cellularComponents: cellularComponents});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addCellularComponent}
                            multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.assays}
                            ref={instance => { this.assayPicker = instance; }}
                            selectedItemsCallback={(assays) => {
                                this.setState({assay: assays.length > 0 ? assays[0] : ''});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                        />
                    </Col>
                    <Col align="left">
                        <Button variant="success" onClick={() => {
                            let annotation = {
                                gene: this.state.gene,
                                whenExpressed: this.state.lifeStages,
                                assay: this.state.assay,
                                evidence: '',
                                whereExpressed: this.state.anatomyTerms,
                                cellularComponent: this.state.cellularComponents
                            };
                            if (expressionAnnotationIsValid(annotation)) {
                                this.props.addExpressionAnnotation(annotation);
                                this.setState({
                                    gene: '',
                                    anatomyTerms: [],
                                    lifeStages: [],
                                    assay: '',
                                    cellularComponents: []
                                });
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
                    At least one gene, one anatomy term, life stage term or cellular component, and one method must be provided.
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
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state),
    assays: getAssays(state),
    cellularComponents: getCellularComponents(state),
    isLoading: isLoading(state)
});

export default connect(mapStateToProps, {addExpressionAnnotation, addGene, addAnatomyTerm, addLifeStage, addCellularComponent})(ExpressionAnnotator);
