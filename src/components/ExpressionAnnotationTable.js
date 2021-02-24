import React, {Component} from 'react';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosWarning } from 'react-icons/io';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
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
                        <th>When Expressed</th>
                        <th>Cellular Component</th>
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
                            <span>{a.gene.value}&nbsp;</span>
                            <OverlayTrigger
                                popperConfig={{
                                    modifiers: {
                                        preventOverflow: {
                                            enabled: false
                                        }
                                    }
                                }}
                                overlay={<Tooltip id="button-tooltip">ID: {a.gene.modId}</Tooltip>}>
                                <AiOutlineInfoCircle/>
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
                            {a.whereExpressed.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
                                popperConfig={{
                                        modifiers: {
                                            preventOverflow: {
                                                enabled: false
                                            }
                                        }
                                    }}
                                overlay={<Tooltip id="button-tooltip">ID: {e.modId}</Tooltip>}>
                                <AiOutlineInfoCircle/>
                            </OverlayTrigger></Badge>&nbsp;</span>)}
                        </td>
                        <td>
                            {a.whenExpressed.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
                                popperConfig={{
                                    modifiers: {
                                        preventOverflow: {
                                            enabled: false
                                        }
                                    }
                                }}
                                overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <AiOutlineInfoCircle/>
                            </OverlayTrigger></Badge>&nbsp;</span>)}
                        </td>
                        <td>
                            {a.cellularComponent.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
                                popperConfig={{
                                    modifiers: {
                                        preventOverflow: {
                                            enabled: false
                                        }
                                    }
                                }}
                                overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                <AiOutlineInfoCircle/>
                            </OverlayTrigger></Badge>&nbsp;</span>)}
                        </td>
                        <td>
                            <Badge variant="primary">{a.assay.value}</Badge>
                        </td>
                        <td>
                            {((date)=>date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0") + ':' + String(date.getSeconds()).padStart(2, "0"))(new Date(a.dateAssigned))}
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
