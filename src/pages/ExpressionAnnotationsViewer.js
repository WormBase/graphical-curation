import React, {Component} from 'react';
import {connect} from "react-redux";
import {getExpressionAnnotations} from "../redux/selectors/expressionAnnotationsSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosWarning } from 'react-icons/io';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {deleteExpressionAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {expressionAnnotationNtoN} from "../redux/constraints/expression";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
    setActiveView,
    setExpressionAnnotationForEditing
} from "../redux/actions/internalStateActions";
import Table from "react-bootstrap/Table";

class ExpressionAnnotationsViewer extends Component{

    render() {
        return (
            <Table striped bordered hover size="xs" responsive>
                <thead>
                    <tr style={{backgroundColor: 'lightgray'}}>
                        {this.props.showAnnotationIds ? <th>ID</th> : ''}
                        <th width="100px">Gene</th>
                        <th>Where Expressed</th>
                        <th>Cellular Component</th>
                        <th>When Expressed</th>
                        <th>Method</th>
                        <th>Date Assigned</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.expressionAnnotations.length === 0 ? 'No Annotations' :
                    this.props.expressionAnnotations.map(a =>
                    <tr>
                        {this.props.showAnnotationIds ? <td><p style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{a.annotationId}</p></td> : ''}
                        <td>
                            <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.gene.modId}</Tooltip>}>
                                <span>{a.gene.value}</span>
                            </OverlayTrigger>
                            {expressionAnnotationNtoN(a) ?
                                <span>
                                    <OverlayTrigger popperConfig={{modifiers: {preventOverflow: {enabled: false}}}}
                                        overlay={
                                            <Tooltip>
                                                Multiple 'where expressed' and 'when expressed' entries. This implies that the gene product is expressed in all tissues specified during all developmental stages specified
                                            </Tooltip>
                                        }>
                                        <IoIosWarning />
                                    </OverlayTrigger>
                                </span> : ''}
                        </td>
                        <td>
                            {a.whereExpressed.map(e => <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                        </td>
                        <td>
                            {a.cellularComponent.map(e => <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                        </td>
                        <td>
                            {a.whenExpressed.map(e => <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                        </td>
                        <td>
                            <Badge variant="primary">{a.assay.value}</Badge>
                        </td>
                        <td>
                            {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0") + ':' + String(date.getSeconds()).padStart(2, "0"))(new Date(a.dateAssigned))}
                        </td>
                        <td align="right">
                            <Button variant="light" onClick={() => {
                                this.props.setExpressionAnnotationForEditing(a);
                                this.props.setActiveView("annotator");
                            }}><FaEdit /></Button>
                            <Button variant="light" onClick={() => {
                                this.props.deleteExpressionAnnotation(a.annotationId);
                            }}><FaTrash /></Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    expressionAnnotations: getExpressionAnnotations(state)
});

export default connect(mapStateToProps, {deleteExpressionAnnotation, setActiveView, setExpressionAnnotationForEditing})(ExpressionAnnotationsViewer);
