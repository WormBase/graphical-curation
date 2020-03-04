import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpressionAnnotator from "./ExpressionAnnotator";

class Main extends Component{

  render() {
    return (
        <Container>
            <Row>
                <Col>
                    <ExpressionAnnotator/>
                </Col>
            </Row>
        </Container>

    );
  }
}

export default Main;
