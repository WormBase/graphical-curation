import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getPhenotypeAnnotations} from "../redux/selectors/phenotypeAnnotationsSelector";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import {deletePhenotypeAnnotation} from "../redux/actions/phenotypeAnnotationsActions";

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
                    <Row>
                        <Col>
                            {a.object.value}
                        </Col>
                        <Col>
                            {a.phenotypeTerms.map(e => <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            {a.anatomyTerms.map(e => <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            {a.lifeStages.map(e => <span><Badge variant="primary">{e.value}</Badge>&nbsp;</span>)}
                        </Col>
                        <Col>
                            {a.phenotypeStatement}
                        </Col>
                        <Col>
                            {((date)=>date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())(new Date(a.dateAssigned))}
                        </Col>
                        <Col align="right">
                            <Button variant="light" onClick={() => {
                                this.props.deletePhenotypeAnnotation(a.annotationId);
                            }}><IoIosRemoveCircleOutline /></Button>
                        </Col>
                    </Row>)}
            </Container>

        );
    }
}

const mapStateToProps = state => ({
    phenotypeAnnotations: getPhenotypeAnnotations(state)
});

export default connect(mapStateToProps, {deletePhenotypeAnnotation})(PhenotypeAnnotationsViewer);
