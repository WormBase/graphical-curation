import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpressionAnnotator from "./ExpressionAnnotator";
import ExpressionAnnotationsViewer from "./ExpressionAnnotationsViewer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import queryString from 'query-string';
import {fetchEntities} from "../redux/actions/textMinedEntitiesAction";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

class GraphicalCuration extends Component{

    componentDidMount() {
        let articleId = queryString.parse(this.props.location.search).articleId;
        console.log(articleId);
        this.props.fetchEntities(process.env.REACT_APP_FETCH_ENTITIES_API_ENDPOINT, articleId);
    }

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" eventKey="0">
                                Expression Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Tabs defaultActiveKey="annotator">
                                    <Tab eventKey="annotator" title="Create Annotation">
                                        <ExpressionAnnotator maxEntities={5}/>
                                    </Tab>
                                    <Tab eventKey="viewer" title="View Annotations">
                                        <ExpressionAnnotationsViewer/>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="" eventKey="1">
                                Phenotype Annotations
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                Phenotype annotations not available
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <br/>
                <br/>
                <br/>
                <div align="center"><Button variant="primary">Save All Annotations</Button></div>
            </div>
        );
    }
}

export default connect(null, {fetchEntities})(withRouter(GraphicalCuration));
