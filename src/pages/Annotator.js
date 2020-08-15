import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    isLoading,
    getPhenotypeTerms,
    getAnatomyTerms, getGenes, getAnatomyFunctionAssays
} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
    addPhenotypeTerm,
    addAnatomyTerm,
    addGene
} from "../redux/actions/textMinedEntitiesActions";
import FormControl from "react-bootstrap/FormControl";
import {anatomyFunctionAnnotationIsValid} from "../redux/constraints/anatomyFunction";
import {
    addAnatomyFunctionAnnotation,
    modifyAnatomyFunctionAnnotation
} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {getAnatomyFunctionAnnotationForEditing} from "../redux/selectors/internalStateSelector";
import {unsetAnatomyFunctionAnnotationForEditing} from "../redux/actions/internalStateActions";
import {entityTypes} from "../autocomplete";
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import {AnnotationCreatedModal, WrongAnnotationModal} from "./Modals";


class AnatomyFunctionAnnotator extends Component{
    constructor(props) {
        super(props);
        this.genePicker = React.createRef();
        this.phenoTermPicker = React.createRef();
        this.anatomyTermsPicker = React.createRef();
        this.assayPicker = React.createRef();
        this.state = {
            phenoTerm: '',
            gene: '',
            involvedOption: 'involved',
            assay: '',
            anatomyTerms: [],
            remarks: [],
            noctuaModels: [],
            genotypes: [],
            authorStatements: [],
            annotationCreatedShow: false,
            wrongAnnotationShow: false,
            createModify: 'Create'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.anatomyFunctionAnnotationForEditing !== prevProps.anatomyFunctionAnnotationForEditing) {
            this.setState({
                gene: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.gene : '',
                phenoTerm: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.phenotype : new Map(),
                anatomyTerms: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.anatomyTerms : new Map(),
                remarks: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.remarks : [],
                noctuaModels: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.noctuamodels : [],
                genotypes: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.genotypes : [],
                authorStatements: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.authorstatements : [],
                involvedOption: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.involved : 'involved',
                assay: this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.assay : ''
            });
        }
    }

    resetPickers() {
        this.genePicker.reset();
        this.phenoTermPicker.reset();
        this.anatomyTermsPicker.reset();
        this.assayPicker.reset();
        this.props.unsetAnatomyFunctionAnnotationForEditing();
        this.setState({gene: '', phenoTerm: [], anatomyTerms: [], involvedOption: 'involved', remarks: [], noctuaModels: [], genotypes: [], authorStatements: []});
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
                    <Col sm={6}>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <EntityPicker
                                        title={"Phenotype"}
                                        entities={this.props.phenotypeTerms}
                                        ref={instance => { this.phenoTermPicker = instance; }}
                                        selectedItemsCallback={(phenoTerms) => {
                                            this.setState({phenoTerm: phenoTerms});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addPhenotypeTerm}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.phenotype : ''}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.PHENOTYPE}
                                        checkboxes={["Autonomous", "Nonautonomous"]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <EntityPicker
                                        title={this.state.involvedOption === 'not_involved' ? 'Not involved tissues' : 'Involved tissues'}
                                        entities={this.props.anatomyTerms}
                                        ref={instance => { this.anatomyTermsPicker = instance; }}
                                        selectedItemsCallback={(anatomyTerms) => {
                                            this.setState({anatomyTerms: anatomyTerms});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addAnatomyTerm}
                                        checkboxes={this.state.involvedOption === "involved" ? ["Sufficient", "Necessary"] : ["Insufficient", "Unnecessary"]}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.anatomyTerms : ''}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.ANATOMY_TERM}
                                        multiSelect/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={4}>
                        <Container fluid>
                            <Row>
                                <Col sm={6}>
                                    <EntityPicker
                                        title={"Genes"}
                                        entities={this.props.genes}
                                        ref={instance => { this.genePicker = instance; }}
                                        selectedItemsCallback={(genes) => {
                                            this.setState({gene: genes});
                                        }}
                                        count={this.props.maxEntities}
                                        isLoading={this.props.isLoading}
                                        addEntity={this.props.addGene}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.gene : ''}
                                        autocompleteObj={this.props.autocompleteObj}
                                        entityType={entityTypes.GENE}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <h6>Involved/not involved in</h6>
                                    <FormControl as="select" value={this.state.involvedOption} onChange={(e) => {
                                        this.setState({involvedOption: e.target.value});
                                        this.anatomyTermsPicker.reset();
                                    }}>
                                        <option value="involved" selected>Involved</option>
                                        <option value="not_involved">Not Involved</option>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <EntityPicker
                                        title={"Assay"}
                                        entities={this.props.anatomyFunctionAssays}
                                        ref={instance => { this.assayPicker = instance; }}
                                        selectedItemsCallback={(assays) => {
                                            this.setState({assay: assays});
                                        }}
                                        count={this.props.maxEntities}
                                        selectedEntities={this.props.anatomyFunctionAnnotationForEditing !== null ? this.props.anatomyFunctionAnnotationForEditing.assay : ''}
                                        isLoading={this.props.isLoading}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <div align="center"><h6>Remarks</h6></div>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <h7 align="center">General Remarks</h7>
                                            </Col>
                                        </Row>
                                        {this.state.remarks.map((remark, idx) =>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <FormControl as="textarea" rows="3" value={remark} onChange={event => {
                                                            let remarks = [...this.state.remarks];
                                                            remarks[idx] = event.target.value;
                                                            this.setState({remarks: remarks})}}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button variant="light" onClick={() => {
                                                            let remarks = [...this.state.remarks];
                                                            remarks.splice(idx, 1);
                                                            this.setState({remarks: remarks});
                                                        }}><FaMinusCircle/></Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                        <Row>
                                            <Col>
                                                <Button variant="light" onClick={() => {
                                                    let remarks = [...this.state.remarks];
                                                    remarks.push('');
                                                    this.setState({remarks: remarks});
                                                }}><FaPlusCircle/></Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                &nbsp;
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h7 align="center">Noctua Models</h7>
                                            </Col>
                                        </Row>
                                        {this.state.noctuaModels.map((noctuaModel, idx) =>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <FormControl as="textarea" rows="3" value={noctuaModel} onChange={event => {
                                                            let noctuaModels = [...this.state.noctuaModels];
                                                            noctuaModels[idx] = event.target.value;
                                                            this.setState({noctuaModels: noctuaModels})}}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button variant="light" onClick={() => {
                                                            let noctuaModels = [...this.state.noctuaModels];
                                                            noctuaModels.splice(idx, 1);
                                                            this.setState({noctuaModels: noctuaModels});
                                                        }}><FaMinusCircle/></Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                        <Row>
                                            <Col>
                                                <Button variant="light" onClick={() => {
                                                    let noctuaModels = [...this.state.noctuaModels];
                                                    noctuaModels.push('');
                                                    this.setState({noctuaModels: noctuaModels});
                                                }}><FaPlusCircle/></Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                &nbsp;
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h7 align="center">Genotypes</h7>
                                            </Col>
                                        </Row>
                                        {this.state.genotypes.map((genotype, idx) =>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <FormControl as="textarea" rows="3" value={genotype} onChange={event => {
                                                            let genotypes = [...this.state.genotypes];
                                                            genotypes[idx] = event.target.value;
                                                            this.setState({genotypes: genotypes})}}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button variant="light" onClick={() => {
                                                            let genotypes = [...this.state.genotypes];
                                                            genotypes.splice(idx, 1);
                                                            this.setState({genotypes: genotypes});
                                                        }}><FaMinusCircle/></Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                        <Row>
                                            <Col>
                                                <Button variant="light" onClick={() => {
                                                    let genotypes = [...this.state.genotypes];
                                                    genotypes.push('');
                                                    this.setState({genotypes: genotypes});
                                                }}><FaPlusCircle/></Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                &nbsp;
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h7 align="center">Author Statements</h7>
                                            </Col>
                                        </Row>
                                        {this.state.authorStatements.map((authorStatement, idx) =>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <FormControl as="textarea" rows="3" value={authorStatement} onChange={event => {
                                                            let authorStatements = [...this.state.authorStatements];
                                                            authorStatements[idx] = event.target.value;
                                                            this.setState({authorStatements: authorStatements})}}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button variant="light" onClick={() => {
                                                            let authorStatements = [...this.state.authorStatements];
                                                            authorStatements.splice(idx, 1);
                                                            this.setState({authorStatements: authorStatements});
                                                        }}><FaMinusCircle/></Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                        <Row>
                                            <Col>
                                                <Button variant="light" onClick={() => {
                                                    let authorStatements = [...this.state.authorStatements];
                                                    authorStatements.push('');
                                                    this.setState({authorStatements: authorStatements});
                                                }}><FaPlusCircle/></Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2} align="left">
                        <Button variant="success" onClick={() => {
                            let annotation = {
                                assay: this.state.assay,
                                phenotype: this.state.phenoTerm,
                                gene: this.state.gene,
                                anatomyTerms: this.state.anatomyTerms,
                                evidence: this.props.evidence,
                                remarks: this.state.remarks,
                                noctuamodels: this.state.noctuaModels,
                                genotypes: this.state.genotypes,
                                authorstatements: this.state.authorStatements,
                                involved: this.state.involvedOption
                            };
                            if (anatomyFunctionAnnotationIsValid(annotation)) {
                                if (this.props.anatomyFunctionAnnotationForEditing !== null) {
                                    annotation.annotationId = this.props.anatomyFunctionAnnotationForEditing.annotationId;
                                    this.props.modifyAnatomyFunctionAnnotation(annotation);
                                } else {
                                    this.props.addAnatomyFunctionAnnotation(annotation);
                                }
                                this.setState({
                                    createModify: this.props.anatomyFunctionAnnotationForEditing !== null ? 'Modified' : 'Created'
                                });
                                this.resetPickers();
                                this.setState({annotationCreatedShow: true});
                                setTimeout(() => this.setState({annotationCreatedShow: false}), 2000);
                            } else {
                                this.setState({wrongAnnotationShow: true});
                            }
                        }}>{this.props.anatomyFunctionAnnotationForEditing !== null ? 'Modify' : 'Create'} Annotation</Button><br/><br/>
                        <Button variant="danger" onClick={()=> this.resetPickers()}>{this.props.anatomyFunctionAnnotationForEditing !== null ? 'Cancel' : 'Clear'}</Button>
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
    phenotypeTerms: getPhenotypeTerms(state),
    isLoading: isLoading(state),
    anatomyFunctionAssays: getAnatomyFunctionAssays(state),
    anatomyTerms: getAnatomyTerms(state),
    anatomyFunctionAnnotationForEditing: getAnatomyFunctionAnnotationForEditing(state)
});

export default connect(mapStateToProps, {addPhenotypeTerm, addAnatomyTerm, addGene, addAnatomyFunctionAnnotation,
    modifyAnatomyFunctionAnnotation, unsetAnatomyFunctionAnnotationForEditing})(AnatomyFunctionAnnotator);