import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getExpressionAnnotations} from "../redux/selectors/expressionSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosRemoveCircleOutline, IoIosWarning } from 'react-icons/io';
import {deleteExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationNtoN} from "../redux/constraints/annotation";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
                    <Col><h6>Gene</h6></Col>
                    <Col><h6>Where Expressed</h6></Col>
                    <Col><h6>When Expressed</h6></Col>
                    <Col><h6>Method</h6></Col>
                    <Col><h6>Date Assigned</h6></Col>
                    <Col>&nbsp;</Col>
                </Row>
                {this.props.expressionAnnotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.expressionAnnotations.map(a =>
                    <Row>
                        <Col>
                            {a.gene.value}
                        </Col>
                        <Col>
                            {a.whereExpressed.map(e => <span><Badge variant="secondary">{e.value}</Badge>&nbsp;</span>)}
                            {expressionAnnotationNtoN(a) ?
                                <span>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                This annotation contains multiple 'where expressed' and multiple 'when expressed' entries
                                            </Tooltip>
                                        }>
                                        <IoIosWarning />
                                    </OverlayTrigger>
                                </span> : ''}
                        </Col>
                        <Col>
                            {a.whenExpressed.map(e => <span><Badge variant="secondary">{e.value}</Badge>&nbsp;</span>)}
                            {expressionAnnotationNtoN(a) ?
                                <span>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Multiple 'where expressed' and 'when expressed' entries. This implies that the gene product is expressed in all tissues specified during all developmental stages specified
                                            </Tooltip>
                                        }>
                                        <IoIosWarning />
                                    </OverlayTrigger>
                                </span> : ''}
                        </Col>
                        <Col>
                            {a.assay.value}
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
    expressionAnnotations: getExpressionAnnotations(state)
});

export default connect(mapStateToProps, {deleteExpressionAnnotation})(ExpressionAnnotationsViewer);
