import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAnatomyTerms, getGenes, getLifeStages} from "../redux/selectors/textMinedEntitiesSelector";
import EntityPicker from "./EntityPicker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class ExpressionAnnotator extends Component{

  render() {
    return (
        <Container>
            <Row>
                <Col>
                    <EntityPicker entities={this.props.genes} annotationId={this.props.annotationId}/>
                </Col>
                <Col>
                    <EntityPicker entities={this.props.anatomyTerms} annotationId={this.props.annotationId} multiSelect/>
                </Col>
                <Col>
                    <EntityPicker entities={this.props.lifeStages} annotationId={this.props.annotationId} multiSelect/>
                </Col>
                <Col>
                    <Button onClick={() => {

                    }}>Save Annotation</Button>
                </Col>
            </Row>
        </Container>

    );
  }
}

const mapStateToProps = state => ({
    genes: getGenes(state),
    anatomyTerms: getAnatomyTerms(state),
    lifeStages: getLifeStages(state)
});

export default connect(mapStateToProps, {})(ExpressionAnnotator);
