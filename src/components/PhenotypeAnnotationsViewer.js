import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getPhenotypeAnnotations} from "../redux/selectors/phenotypeAnnotationsSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {deletePhenotypeAnnotation} from "../redux/actions/phenotypeAnnotationsActions";
import {setActiveView, setPhenotypeAnnotationForEditing} from "../redux/actions/internalStateActions";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class PhenotypeAnnotationsViewer extends Component{

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
                    {this.props.showAnnotationIds ? <Col><h6>ID</h6></Col> : ''}
                    <Col><h6>Object</h6></Col>
                    <Col><h6>Phenotype Terms</h6></Col>
                    <Col><h6>Anatomy Terms</h6></Col>
                    <Col><h6>Life Stages</h6></Col>
                    <Col><h6>Phenotype Statement</h6></Col>
                    <Col><h6>Date Assigned</h6></Col>
                    <Col>&nbsp;</Col>
                </Row>
                {this.props.phenotypeAnnotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.phenotypeAnnotations.map(a =>
                    <div>
                        <Row>
                            {this.props.showAnnotationIds ? <Col>{a.annotationId}</Col> : ''}
                            <Col>
                                <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.object.modId}</Tooltip>}>
                                    <span>{a.object.value}</span>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                {a.phenotypeTerms.map(e => <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                            </Col>
                            <Col>
                                {a.anatomyTerms.map(e => <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                            </Col>
                            <Col>
                                {a.lifeStages.map(e => <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                            </Col>
                            <Col>
                                <OverlayTrigger trigger="click" placement="right" poppperConfig={{modifiers: {preventOverflow: {enabled: false}}}} delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip"><span>{a.phenotypeStatement}</span></Tooltip>}><span style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{a.phenotypeStatement}</span></OverlayTrigger>
                            </Col>
                            <Col>
                                {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0") + ':' + String(date.getSeconds()).padStart(2, "0"))(new Date(a.dateAssigned))}
                            </Col>
                            <Col align="right">
                                <Button variant="light" onClick={() => {
                                    this.props.setPhenotypeAnnotationForEditing(a);
                                    this.props.setActiveView("annotator");
                                }}><FaEdit /></Button>
                                <Button variant="light" onClick={() => {
                                    this.props.deletePhenotypeAnnotation(a.annotationId);
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
    phenotypeAnnotations: getPhenotypeAnnotations(state)
});

export default connect(mapStateToProps, {deletePhenotypeAnnotation, setActiveView, setPhenotypeAnnotationForEditing})(PhenotypeAnnotationsViewer);
