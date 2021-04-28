import React, {Component} from 'react';
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getPhenotypeAnnotations} from "../redux/selectors/phenotypeAnnotationsSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
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
                        <th>Phenotype</th>
                        <th>Assayed via</th>
                        <th>Not Observed</th>
                        <th>Alleles</th>
                        <th>Genes</th>
                        <th>Transgenes</th>
                        <th>Anatomy Terms</th>
                        <th>Life Stages</th>
                        <th>Strains</th>
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
                                <span>{a.phenotype.value}&nbsp;</span>
                                <OverlayTrigger overlay={<Tooltip id="button-tooltip">ID: {a.phenotype.modId}</Tooltip>}>
                                    <AiOutlineInfoCircle/>
                                </OverlayTrigger>
                            </td>
                            <td>
                                {a.assay}
                            </td>
                            <th>{a.notObserved ? "Not Observed" : ""}</th>
                            <td>
                                {a.alleles.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
                                    popperConfig={{
                                        modifiers: {
                                            preventOverflow: {
                                                enabled: false
                                            }
                                        }
                                    }}
                                    overlay={<Tooltip id="button-tooltip">ID: {e.modId} </Tooltip>}>
                                    <AiOutlineInfoCircle/>
                                </OverlayTrigger></Badge>&nbsp;</span>)}
                            </td>
                            <td>
                                {a.genes.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
                                    popperConfig={{
                                        modifiers: {
                                            preventOverflow: {
                                                enabled: false
                                            }
                                        }
                                    }}
                                    overlay={<Tooltip id="button-tooltip">ID: {e.modId} </Tooltip>}>
                                    <AiOutlineInfoCircle/>
                                </OverlayTrigger></Badge>&nbsp;</span>)}
                            </td>
                            <td>
                                {a.transgenes.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
                                    popperConfig={{
                                        modifiers: {
                                            preventOverflow: {
                                                enabled: false
                                            }
                                        }
                                    }}
                                    overlay={<Tooltip id="button-tooltip">ID: {e.modId} </Tooltip>}>
                                    <AiOutlineInfoCircle/>
                                </OverlayTrigger></Badge>&nbsp;</span>)}
                            </td>
                            <td>
                                {a.anatomyTerms.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
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
                                {a.lifeStages.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
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
                                {a.strains.map(e => <span><Badge variant="primary">{e.value} <OverlayTrigger
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
                            <td style={a.phenotypeStatement.length > 10 ? {minWidth: "300px"} : {}}>
                                <p dangerouslySetInnerHTML={{ __html: a.phenotypeStatement}}/>
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

const mapStateToProps = state => ({
    phenotypeAnnotations: getPhenotypeAnnotations(state)
});

export default connect(mapStateToProps, {deletePhenotypeAnnotation, setActiveView})(PhenotypeAnnotationsViewer);
