import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosRemoveCircleOutline, IoIosWarning } from 'react-icons/io';
import {deleteExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {getAnatomyFunctionAnnotations} from "../redux/selectors/anatomyFunctionAnnotationsSelector";

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
                    <Col><h6>Phenotype</h6></Col>
                    <Col><h6>Gene</h6></Col>
                    <Col><h6>Involved/Not Involved in</h6></Col>
                    <Col><h6>Anatomy Terms</h6></Col>
                    <Col><h6>Remark</h6></Col>
                    <Col><h6>Noctua Model</h6></Col>
                    <Col><h6>Genotype</h6></Col>
                    <Col><h6>Date Assigned</h6></Col>
                    <Col>&nbsp;</Col>
                </Row>
                {this.props.anatomyFunctionAnnotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.anatomyFunctionAnnotations.map(a =>
                    <Row>
                        <Col>
                            {a.phenotype.value}
                        </Col>
                        <Col>
                            {a.gene.value}
                        </Col>
                        <Col>
                            {a.involved}
                        </Col>
                        <Col>
                            {[...a.anatomyTerms.keys()].map(k => <span><Badge variant="primary">{k.value + ' ' + [...a.anatomyTerms.get(k).keys()].map(k2 => a.anatomyTerms.get(k).get(k2) ? '(' + k2 + ') ' : '').join('')}</Badge>&nbsp;</span>)}
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
                            {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())(new Date(a.dateAssigned))}
                        </Col>
                        <Col align="right">
                            <Button variant="light" onClick={() => {
                                this.props.deleteExpressionAnnotation(a.annotationId);
                            }}><IoIosRemoveCircleOutline /></Button>
                        </Col>
                    </Row>)}
            </Container>

        );
    }
}

const mapStateToProps = state => ({
    anatomyFunctionAnnotations: getAnatomyFunctionAnnotations(state)
});

export default connect(mapStateToProps, {deleteExpressionAnnotation})(ExpressionAnnotationsViewer);
