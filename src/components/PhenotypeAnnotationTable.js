import React, {Component} from 'react';
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getPhenotypeAnnotations} from "../redux/selectors/phenotypeAnnotationsSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {deletePhenotypeAnnotation} from "../redux/actions/phenotypeAnnotationsActions";
import {setActiveView} from "../redux/actions/internalStateActions";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";

class PhenotypeAnnotationsViewer extends Component{

    render() {
        return (
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr style={{backgroundColor: 'lightgray'}}>
                    {this.props.showAnnotationIds ? <th>ID</th> : ''}
                        <th>Object</th>
                        <th>Phenotype Terms</th>
                        <th>Anatomy Terms</th>
                        <th>Life Stages</th>
                        <th>Phenotype Statement</th>
                        <th>Date Assigned</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.annotations.length === 0 ? <Row><Col sm={12}>No Annotations</Col></Row> :
                    this.props.annotations.map(a =>
                        <tr>
                            {this.props.showAnnotationIds ? <td><p style={{width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{a.annotationId}</p></td> : ''}
                            <td>
                                <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{a.object.modId}</Tooltip>}>
                                    <span>{a.object.value}</span>
                                </OverlayTrigger>
                            </td>
                            <td>
                                {a.phenotypeTerms.map(e => <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                            </td>
                            <td>
                                {a.anatomyTerms.map(e => <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                            </td>
                            <td>
                                {a.lifeStages.map(e => <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip">{e.modId}</Tooltip>}>
                                    <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span></OverlayTrigger>)}
                            </td>
                            <td style={a.phenotypeStatement.length > 10 ? {minWidth: "300px"} : {}}>
                                <p dangerouslySetInnerHTML={{ __html: a.phenotypeStatement}}/>
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

const mapStateToProps = state => ({
    phenotypeAnnotations: getPhenotypeAnnotations(state)
});

export default connect(mapStateToProps, {deletePhenotypeAnnotation, setActiveView})(PhenotypeAnnotationsViewer);
