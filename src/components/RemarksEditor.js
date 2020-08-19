import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

export class RemarksEditor extends React.Component {
    render() {
        return (
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row><Col sm={12}><h7 align="center">{this.props.title}</h7></Col></Row>
                {this.props.remarks.map((remark, idx) =>
                    <div>
                        <Row>
                            <Col sm={12}>
                                <FormControl as="textarea" rows="3" value={remark} onChange={event => {
                                    let tmpRemarks = _.cloneDeep(this.props.remarks);
                                    tmpRemarks[idx] = event.target.value;
                                    this.props.remarksModified(tmpRemarks);
                                }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="light" onClick={() => {
                                    let tmpRemarks = _.cloneDeep(this.props.remarks);
                                    tmpRemarks.splice(idx, 1);
                                    this.props.remarksModified(tmpRemarks);
                            }}><FaMinusCircle/></Button>
                        </Col>
                        </Row>
                    </div>
                )}
                <Row>
                    <Col>
                        <Button variant="light" onClick={() => {
                            let tmpRemarks = _.cloneDeep(this.props.remarks);
                            tmpRemarks.push('');
                            this.props.remarksModified(tmpRemarks);
                        }}><FaPlusCircle/></Button>
                    </Col>
                </Row>
            </Container>);
    }
}

export default RemarksEditor;