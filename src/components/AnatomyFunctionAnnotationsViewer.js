import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {getAnatomyFunctionAnnotations} from "../redux/selectors/anatomyFunctionAnnotationsSelector";
import {deleteAnatomyFunctionAnnotation} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {setActiveView, setAnatomyFunctionAnnotationForEditing} from "../redux/actions/internalStateActions";

class ExpressionAnnotationsViewer extends Component{

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row style={{
                    backgroundColor: 'lightgray',
                }}>
                    <Col sm={1}><h6>Phenotype</h6></Col>
                    <Col sm={1}><h6>Gene</h6></Col>
                    <Col sm={1}><h6>Involved/Not Involved in</h6></Col>
                    <Col sm={2}><h6>Anatomy Terms</h6></Col>
                    <Col><h6>Remarks</h6></Col>
                    <Col><h6>Noctua Models</h6></Col>
                    <Col><h6>Genotypes</h6></Col>
                    <Col><h6>Author Statements</h6></Col>
                    <Col><h6>Assay</h6></Col>
                    <Col><h6>Date Assigned</h6></Col>
                    <Col><h6>&nbsp;</h6></Col>
                </Row>
                {this.props.anatomyFunctionAnnotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.anatomyFunctionAnnotations.map((a, idx) =>
                    <div>
                        <Row>
                            <Col sm={1}>
                                {a.phenotype.value + ' ' + Object.entries(a.phenotype.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}
                            </Col>
                            <Col sm={1}>
                                {a.gene !== '' ? a.gene.value : ''}
                            </Col>
                            <Col sm={1}>
                                {a.involved}
                            </Col>
                            <Col sm={2}>
                                {a.anatomyTerms.map(a => <span><Badge variant="primary">{a.value + ' ' + Object.entries(a.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}</Badge>&nbsp;</span>)}
                            </Col>
                            <Col>
                                <div dangerouslySetInnerHTML={{ __html: a.remarks.join('<br/><br/>')}}></div>
                            </Col>
                            <Col>
                                <div dangerouslySetInnerHTML={{ __html: a.noctuamodels.join('<br/><br/>')}}></div>
                            </Col>
                            <Col>
                                <div dangerouslySetInnerHTML={{ __html: a.genotypes.join('<br/><br/>')}}></div>
                            </Col>
                            <Col>
                                <div dangerouslySetInnerHTML={{ __html: a.authorstatements.join('<br/><br/>')}}></div>
                            </Col>
                            <Col>
                                {a.assay.value}
                            </Col>
                            <Col>
                                {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0") + ':' + String(date.getSeconds()).padStart(2, "0"))(new Date(a.dateAssigned))}
                            </Col>
                            <Col align="right">
                                <Button variant="light" onClick={() => {
                                    this.props.setAnatomyFunctionAnnotationForEditing(a);
                                    this.props.setActiveView("annotator");
                                }}><FaEdit /></Button>
                                <Button variant="light" onClick={() => {
                                    this.props.deleteAnatomyFunctionAnnotation(a.annotationId);
                                }}><FaTrash /></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col><hr/></Col>
                        </Row>
                    </div>)}
            </Container>

        );
    }
}

const mapStateToProps = state => ({
    anatomyFunctionAnnotations: getAnatomyFunctionAnnotations(state)
});

export default connect(mapStateToProps, {deleteAnatomyFunctionAnnotation, setAnatomyFunctionAnnotationForEditing, setActiveView})(ExpressionAnnotationsViewer);
