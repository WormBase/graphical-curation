import React, {Component} from 'react';
import {connect} from "react-redux";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {getAnatomyFunctionAnnotations} from "../redux/selectors/anatomyFunctionAnnotationsSelector";
import {deleteAnatomyFunctionAnnotation} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {setActiveView, setAnatomyFunctionAnnotationForEditing} from "../redux/actions/internalStateActions";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";

class ExpressionAnnotationsViewer extends Component{

    render() {
        return (
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr style={{backgroundColor: 'lightgray'}}>
                        {this.props.showAnnotationIds ? <th>ID</th> : ''}
                        <th>Phenotype</th>
                        <th width="100px">Gene</th>
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
                {this.props.anatomyFunctionAnnotations.length === 0 ? 'No Annotations' :
                    this.props.anatomyFunctionAnnotations.map((a, idx) =>
                        <tr>
                            {this.props.showAnnotationIds ? <td><p style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{a.annotationId}</p></td> : ''}
                            <td>
                                <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.phenotype.modId}</Tooltip>}>
                                    <span>{a.phenotype.value + ' ' + Object.entries(a.phenotype.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}</span>
                                </OverlayTrigger>
                            </td>
                            <td>
                                {a.gene !== '' ?
                                    <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.gene.modId}</Tooltip>}>
                                        <span>{a.gene.value}</span>
                                    </OverlayTrigger>
                                    : ''}
                            </td>
                            <td>
                                {a.involved}
                            </td>
                            <td>
                                {a.anatomyTerms.map(a =>
                                    <OverlayTrigger delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.modId}</Tooltip>}>
                                        <span><Badge variant="primary">{a.value + ' ' + Object.entries(a.options).map(([o, v]) => v ? '(' + o + ') ' : '').join('')}</Badge>&nbsp;</span>
                                    </OverlayTrigger>)}
                            </td>
                            <td>
                                <p dangerouslySetInnerHTML={{ __html: a.remarks.join('<br/><br/>')}}/>
                            </td>
                            <td>
                                <p dangerouslySetInnerHTML={{ __html: a.noctuamodels.join('<br/><br/>')}}/>
                            </td>
                            <td>
                                <p dangerouslySetInnerHTML={{ __html: a.genotypes.join('<br/><br/>')}}/>
                            </td>
                            <td>
                                <p dangerouslySetInnerHTML={{ __html: a.authorstatements.join('<br/><br/>')}}/>
                            </td>
                            <td>
                                {a.assay.value}
                            </td>
                            <td>
                                {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0") + ':' + String(date.getSeconds()).padStart(2, "0"))(new Date(a.dateAssigned))}
                            </td>
                            <td align="right">
                                <Button variant="light" onClick={() => {
                                    this.props.setAnatomyFunctionAnnotationForEditing(a);
                                    this.props.setActiveView("annotator");
                                }}><FaEdit /></Button>
                                <Button variant="light" onClick={() => {
                                    this.props.deleteAnatomyFunctionAnnotation(a.annotationId);
                                }}><FaTrash /></Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>

        );
    }
}

const mapStateToProps = state => ({
    anatomyFunctionAnnotations: getAnatomyFunctionAnnotations(state)
});

export default connect(mapStateToProps, {deleteAnatomyFunctionAnnotation, setAnatomyFunctionAnnotationForEditing, setActiveView})(ExpressionAnnotationsViewer);
