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
import FormControl from "react-bootstrap/FormControl";

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
                    <Col><h6>Remark</h6></Col>
                    <Col><h6>Noctua Model</h6></Col>
                    <Col><h6>Genotype</h6></Col>
                    <Col><h6>Assay</h6></Col>
                    <Col><h6>Date Assigned</h6></Col>
                    <Col><h6>&nbsp;</h6></Col>
                </Row>
                {this.props.anatomyFunctionAnnotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.anatomyFunctionAnnotations.map(a =>
                    <Row>
                        <Col sm={1}>
                            {a.phenotype.value}
                        </Col>
                        <Col sm={1}>
                            {a.gene.value}
                        </Col>
                        <Col sm={1}>
                            {a.involved}
                        </Col>
                        <Col sm={2}>
                            {a.anatomyTerms.map(a => <span><Badge variant="primary">{a.value + ' ' + Object.entries(a.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            {a.remark}
                        </Col>
                        <Col>
                            {a.noctuamodel}
                        </Col>
                        <Col>
                            {a.genotype}
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
                    </Row>)}
            </Container>

        );
    }
}

const mapStateToProps = state => ({
    anatomyFunctionAnnotations: getAnatomyFunctionAnnotations(state)
});

export default connect(mapStateToProps, {deleteAnatomyFunctionAnnotation, setAnatomyFunctionAnnotationForEditing, setActiveView})(ExpressionAnnotationsViewer);
