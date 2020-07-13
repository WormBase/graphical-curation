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
                    <Col sm={3}><h6>Phenotype</h6></Col>
                    <Col sm={1}><h6>Gene</h6></Col>
                    <Col sm={1}><h6>Involved/Not Involved in</h6></Col>
                    <Col sm={2}><h6>Anatomy Terms</h6></Col>
                    <Col sm={1}><h6>Remark</h6></Col>
                    <Col sm={1}><h6>Noctua Model</h6></Col>
                    <Col sm={1}><h6>Genotype</h6></Col>
                    <Col sm={1}><h6>Date Assigned</h6></Col>
                    <Col sm={1}>&nbsp;</Col>
                </Row>
                {this.props.anatomyFunctionAnnotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.anatomyFunctionAnnotations.map(a =>
                    <Row>
                        <Col sm={3}>
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
                        <Col sm={1}>
                            {a.remark}
                        </Col>
                        <Col sm={1}>
                            {a.noctuamodel}
                        </Col>
                        <Col sm={1}>
                            {a.genotype}
                        </Col>
                        <Col sm={1}>
                            {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0") + ':' + String(date.getSeconds()).padStart(2, "0"))(new Date(a.dateAssigned))}
                        </Col>
                        <Col sm={1} align="right">
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
