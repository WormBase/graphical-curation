import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getVariants, getAnatomyTerms, getLifeStages, getGenes
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {addPhenotypeAnnotation} from "../redux/actions/phenotypeAnnotationsActions";
import {phenotypeAnnotationIsValid} from "../redux/constraints/expression";
import {
    addVariant,
    addPhenotypeTerm,
    addLifeStage,
    addAnatomyTerm,
    addGene
} from "../redux/actions/textMinedEntitiesAction";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";


class AnatomyFunctionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.state = {
            phenoTerms: [],
            gene: '',
            involvedOption: 1,
            anatomyTerms: [],
            remark: '',
            noctuaModel: '',
            genotype: '',
            annotationCreatedShow: false,
            wrongAnnotationShow: false
        }

        this.resetPickers = this.resetPickers.bind(this);
    }

    resetPickers() {
        this.genePicker.reset()
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.setState({gene: '', phenoTerms: [], anatomyTerms: []});
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
                        <h6 align="center">Phenotype</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Gene</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Involved/Not Involved</h6>
                    </Col>
                    <Col sm={4}>
                        <h6 align="center">{this.state.involvedOption === 2 ? 'Not ' : ''}Involved Tissue</h6>
                    </Col>
                    <Col>
                        <h6 align="center">Remarks</h6>
                    </Col>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EntityPicker
                            entities={this.props.phenotypeTerms}
                            ref={instance => { this.phenoTermPicker = instance; }}
                            selectedItemsCallback={(phenoTerms) => {
                                this.setState({phenoTerms: phenoTerms});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addPhenotypeTerm}
                        />
                    </Col>
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
                        <FormControl as="select" value={this.state.involvedOption} onChange={(e) => {this.setState({involvedOption: parseInt(e.target.value)})}}>
                            <option value="1" selected>Involved</option>
                            <option value="2">Not Involved</option>
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                        <EntityPicker
                            entities={this.props.anatomyTerms}
                            ref={instance => { this.anatomyTermsPicker = instance; }}
                            selectedItemsCallback={(anatomyTerms) => {
                                this.setState({anatomyTerms: anatomyTerms});
                            }}
                            count={this.props.maxEntities}
                            isLoading={this.props.isLoading}
                            addEntity={this.props.addAnatomyTerm}
                            checkboxes={this.state.involvedOption === 1 ? ["Sufficient", "Necessary"] : ["Insufficient", "Unnecessary"]}
                            multiSelect/>
                    </Col>
                    <Col>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <h7 align="center">Remark</h7>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl as="textarea" rows="3" value={this.state.remark} onChange={event =>
                                        this.setState({remark: event.target.value})}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    &nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h7 align="center">Noctua Model</h7>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl as="textarea" rows="3" value={this.state.noctuaModel} onChange={event =>
                                        this.setState({noctuaModel: event.target.value})}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    &nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h7 align="center">Genotype</h7>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl as="textarea" rows="3" value={this.state.genotype} onChange={event =>
                                        this.setState({genotype: event.target.value})}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col align="left">
                        <Button variant="success" onClick={() => {
                            let annotation = {
                                gene: this.state.gene,
                                phenotypeTerms: this.state.phenoTerms,
                                anatomyTerms: this.state.anatomyTerms,
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
    genes: getGenes(state),
    phenotypeTerms: getPhenotypeTerms(state),
    isLoading: isLoading(state),
    anatomyTerms: getAnatomyTerms(state)
});

export default connect(mapStateToProps, {addPhenotypeTerm, addAnatomyTerm, addGene})(AnatomyFunctionAnnotator);
