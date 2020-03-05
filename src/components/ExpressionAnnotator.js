import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAnatomyTerms, getGenes, getLifeStages} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {addExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationIsValid} from "../redux/constraints/annotation";
import Modal from "react-bootstrap/Modal";

class ExpressionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.lifeStagesPicker = React.createRef();
        this.state = {
            gene: '',
            anatomyTerms: new Set(),
            lifeStages: new Set(),
            wrongAnnotationShow: false
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <EntityPicker
                            entities={this.props.genes}
                            ref={instance => { this.genePicker = instance; }}
                            selectedItemsCallback={(genes) => {
                                this.setState({gene: genes.length > 0 ? genes[0] : ''});
                            }}/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.anatomyTerms}
                            ref={instance => { this.anatomyTermsPicker = instance; }}
                            selectedItemsCallback={(anatomyTerms) => {
                                this.setState({anatomyTerms: anatomyTerms});
                            }} multiSelect/>
                    </Col>
                    <Col>
                        <EntityPicker
                            entities={this.props.lifeStages}
                            ref={instance => { this.lifeStagesPicker = instance; }}
                            selectedItemsCallback={(lifeStages) => {
                                this.setState({lifeStages: lifeStages});
                            }} multiSelect/>
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
                                    anatomyTerms: new Set(),
                                    lifeStages: new Set()});
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
                    At least a gene, and one or more anatomy terms and/or one or more life stage terms must be provided.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const mapStateToProps = state => ({
    genes: getGenes(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state)
});

export default connect(mapStateToProps, {addExpressionAnnotation})(ExpressionAnnotator);
