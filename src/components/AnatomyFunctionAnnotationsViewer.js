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
                    {this.props.showAnnotationIds ? <Col><h6>ID</h6></Col> : ''}
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
                            {this.props.showAnnotationIds ? <Col>{a.annotationId}</Col> : ''}
                            <Col sm={1}>
                                <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.phenotype.modId}</Tooltip>}>
                                    <span>{a.phenotype.value + ' ' + Object.entries(a.phenotype.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}</span>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={1}>
                                {a.gene !== '' ?
                                    <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.gene.modId}</Tooltip>}>
                                        <span>{a.gene.value}</span>
                                    </OverlayTrigger>
                                    : ''}
                            </Col>
                            <Col sm={1}>
                                {a.involved}
                            </Col>
                            <Col sm={2}>
                                {a.anatomyTerms.map(a =>
                                    <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{a.value + ' ' + Object.entries(a.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}</Badge>&nbsp;</span>
                                    </OverlayTrigger>)}
                            </Col>
                            <Col>
                                <OverlayTrigger trigger="click" placement="right" poppperConfig={{modifiers: {preventOverflow: {enabled: false}}}} delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip"><p dangerouslySetInnerHTML={{ __html: a.remarks.join('<br/><br/>')}}/></Tooltip>}><p dangerouslySetInnerHTML={{ __html: a.remarks.join('<br/><br/>')}} style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}/></OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger trigger="click" placement="right" poppperConfig={{modifiers: {preventOverflow: {enabled: false}}}} delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip"><p dangerouslySetInnerHTML={{ __html: a.noctuamodels.join('<br/><br/>')}}/></Tooltip>}><p dangerouslySetInnerHTML={{ __html: a.noctuamodels.join('<br/><br/>')}} style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}/></OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger trigger="click" placement="right" poppperConfig={{modifiers: {preventOverflow: {enabled: false}}}} delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip"><p dangerouslySetInnerHTML={{ __html: a.genotypes.join('<br/><br/>')}}/></Tooltip>}><p dangerouslySetInnerHTML={{ __html: a.genotypes.join('<br/><br/>')}} style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}/></OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger trigger="click" placement="right" poppperConfig={{modifiers: {preventOverflow: {enabled: false}}}} delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip"><p dangerouslySetInnerHTML={{ __html: a.authorstatements.join('<br/><br/>')}}/></Tooltip>}><p dangerouslySetInnerHTML={{ __html: a.authorstatements.join('<br/><br/>')}} style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}/></OverlayTrigger>
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
