import React, {Component} from 'react';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";

class AnatomyFunctionAnnotationTable extends Component{

    render() {
        return (
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr style={{backgroundColor: 'lightgray'}}>
                        {this.props.showAnnotationIds ? <th>ID</th> : ''}
                        <th>Phenotype</th>
                        <th>Gene</th>
                        <th>Involved/Not Involved in</th>
                        <th>Anatomy Terms</th>
                        <th>Remarks</th>
                        <th>Noctua Models</th>
                        <th>Genotypes</th>
                        <th>Author Statements</th>
                        <th>Assay</th>
                        <th>Date Assigned</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.annotations.length === 0 ? 'No Annotations' :
                    this.props.annotations.map((a, idx) =>
                        <tr>
                            {this.props.showAnnotationIds ? <td><p style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{a.annotationId}</p></td> : ''}
                            <td>
                                <span>{a.phenotype.value + ' ' + Object.entries(a.phenotype.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}
                                <OverlayTrigger
                                    popperConfig={{
                                        modifiers: {
                                            preventOverflow: {
                                                enabled: false
                                            }
                                        }
                                    }}
                                    overlay={<Tooltip id="button-tooltip">ID: {a.phenotype.modId}</Tooltip>}>
                                    <AiOutlineInfoCircle/>
                                </OverlayTrigger>
                                </span>
                            </td>
                            <td style={{minWidth: "100px"}}>
                                {a.gene !== '' ?
                                    <span>{a.gene.value}
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
                                    </span>
                                    : ''}
                            </td>
                            <td>
                                {a.involved}
                            </td>
                            <td>
                                {a.anatomyTerms.map(a =>
                                    <span><Badge variant="primary">{a.value + ' ' + Object.entries(a.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}&nbsp;
                                    <OverlayTrigger
                                        popperConfig={{
                                            modifiers: {
                                                preventOverflow: {
                                                    enabled: false
                                                }
                                            }
                                        }}
                                        overlay={<Tooltip id="button-tooltip">ID: {a.modId}</Tooltip>}>
                                        <AiOutlineInfoCircle/>
                                    </OverlayTrigger></Badge>&nbsp;</span>)}
                            </td>
                            <td style={a.remarks.some(r => r.length > 10) ? {minWidth: "300px"} : {}}>
                                <p dangerouslySetInnerHTML={{ __html: a.remarks.join('<br/><br/>')}}/>
                            </td>
                            <td style={a.noctuamodels.some(r => r.length > 10) ? {minWidth: "300px"} : {}}>
                                <p dangerouslySetInnerHTML={{ __html: a.noctuamodels.join('<br/><br/>')}}/>
                            </td>
                            <td style={a.genotypes.some(r => r.length > 10) ? {minWidth: "300px"} : {}}>
                                <p dangerouslySetInnerHTML={{ __html: a.genotypes.join('<br/><br/>')}}/>
                            </td>
                            <td style={a.authorstatements.some(r => r.length > 10) ? {minWidth: "300px"} : {}}>
                                <p dangerouslySetInnerHTML={{ __html: a.authorstatements.join('<br/><br/>')}}/>
                            </td>
                            <td>
                                {a.assay.value}
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

export default AnatomyFunctionAnnotationTable;
