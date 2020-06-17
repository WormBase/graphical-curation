import React, {Component} from 'react';
import GraphicalCuration from "@wormbase/graphical-curation";
import queryString from 'query-string';
import {withRouter} from "react-router-dom";
import axios from 'axios';

class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            entities: undefined,
            expressionAnnotations: [
                {
                    annotationId: 1,
                    gene: 'lin-12',
                    whenExpressed: ['adult'],
                    assay: '',
                    evidence: '',
                    whereExpressed: ['tail']
                },
                {
                    annotationId: 2,
                    gene: 'daf-16',
                    whenExpressed: ['embryo'],
                    assay: '',
                    evidence: '',
                    whereExpressed: ['head']
                }]
        }
    }

    fetchEntities = (apiEndpoint, articleId) => {
        this.setState({loading: true});
        axios
            .post(apiEndpoint + articleId)
            .then(res => {
                res.data.entities.ASSAYS = [{value: 'In situ Hybridization'}, {value: 'Immunohistochemistry'},
                    {value: 'Reporter gene'}, {value: 'Western Blot'}, {value: 'Northern blot'}, {value: 'RT-PCR'}];
                this.setState({entities: res.data.entities});
            })
            .catch(err => {
                this.setState({error: err.message});
            });
    };

    componentDidMount() {
        let articleId = queryString.parse(this.props.location.search).articleId;
        console.log(articleId);
        this.fetchEntities(process.env.REACT_APP_FETCH_ENTITIES_API_ENDPOINT, articleId);
    }

    render() {
        return(
            <GraphicalCuration entities={this.state.entities} loading={this.state.loading} error={this.state.error}
                               expressionAnnotations={this.state.expressionAnnotations}
                               expressionAnnotationsSaved={(annotations) => {console.log("Annotations received")}}/>
        );
    }
}

export default withRouter(Main);
