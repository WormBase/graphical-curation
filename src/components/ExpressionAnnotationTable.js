import React, {Component} from 'react';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosWarning } from 'react-icons/io';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {expressionAnnotationNtoN} from "../redux/constraints/expression";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";

class ExpressionAnnotationTable extends Component{

    render() {
        return (
            <Table striped bordered hover size="sm" responsive>
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
                {this.props.annotations.length === 0 ? 'No Annotations' :
                    this.props.annotations.map(a =>
                    <tr>
                        {this.props.showAnnotationIds ? <td><p style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{a.annotationId}</p></td> : ''}
                        <td>
                            <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.gene.modId}</Tooltip>}>
                                <span>{a.gene.value}</span>
                            </OverlayTrigger>
                            {expressionAnnotationNtoN(a) ?
                                <span>
                                    <OverlayTrigger trigger="click" popperConfig={{modifiers: {preventOverflow: {enabled: false}}}}
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
                            {a.whereExpressed.map(e => <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                        </td>
                        <td>
                            {a.cellularComponent.map(e => <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                        </td>
                        <td>
                            {a.whenExpressed.map(e => <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
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
                                this.props.modifyAnnotation(a);
                            }}><FaEdit /></Button>
                            <Button variant="light" onClick={() => {
                                this.props.deleteAnnotation(a);
                            }}><FaTrash /></Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        );
    }
}

export default ExpressionAnnotationTable;
