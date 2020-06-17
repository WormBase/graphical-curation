import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getExpressionAnnotations} from "../redux/selectors/expressionAnnotationsSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosRemoveCircleOutline, IoIosWarning } from 'react-icons/io';
import {deleteExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationNtoN} from "../redux/constraints/expression";
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
                    <Col><h6>Cellular Component</h6></Col>
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
                            {a.whereExpressed.map(e => <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            {a.cellularComponent.map(e => <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            {a.whenExpressed.map(e => <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            <Badge variant="primary">{a.assay.value}</Badge>
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
