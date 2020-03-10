import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    anatomyTermsLoading,
    genesLoading,
    getAnatomyTerms,
    getGenes,
    getLifeStages, lifeStagesLoading
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {addExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationIsValid} from "../redux/constraints/annotation";
import {addGene, addAnatomyTerm, addLifeStage} from "../redux/actions/textMinedEntitiesAction";
import Modal from "react-bootstrap/Modal";
import {fetchGenes} from "../redux/actions/textMinedEntitiesAction";

class ExpressionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.state = {
            gene: '',
            anatomyTerms: [],
            lifeStages: [],
            wrongAnnotationShow: false
        }
    }

    render() {
        return (
            <Container>
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
                            isLoading={this.props.genesLoading}
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
                            isLoading={this.props.anatomyTermsLoading}
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
                            isLoading={this.props.lifeStagesLoading}
                            addEntity={this.props.addLifeStage}
                            multiSelect/>
                    </Col>
                    <Col>
                        &nbsp;
                    </Col>
                    <Col>
                        <Button variant="light" onClick={() => {
                            let annotation = {
                                gene: this.state.gene,
                                whenExpressed: this.state.lifeStages,
                                assay: '',
                                evidence: '',
                                whereExpressed: this.state.anatomyTerms
                            };
                            if (expressionAnnotationIsValid(annotation)) {
                                this.props.addExpressionAnnotation(annotation);
                                this.setState({
                                    gene: '',
                                    anatomyTerms: [],
                                    lifeStages: []});
                                this.genePicker.reset();
                                this.anatomyTermsPicker.reset();
                                this.lifeStagesPicker.reset();
                            } else {
                                this.setState({wrongAnnotationShow: true});
                            }
                        }}>Create Annotation</Button>
                    </Col>
                </Row>
                <WrongAnnotationModal
                    show={this.state.wrongAnnotationShow}
                    onHide={() => this.setState({wrongAnnotationShow: false})}
                />
            </Container>
        );
    }
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
                    A gene, and one or more anatomy terms and/or one or more life stage terms must be provided.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const mapStateToProps = state => ({
    genes: getGenes(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state),
    genesLoading: genesLoading(state),
    anatomyTermsLoading: anatomyTermsLoading(state),
    lifeStagesLoading: lifeStagesLoading(state),
});

export default connect(mapStateToProps, {addExpressionAnnotation, fetchGenes, addGene, addAnatomyTerm, addLifeStage})(ExpressionAnnotator);
