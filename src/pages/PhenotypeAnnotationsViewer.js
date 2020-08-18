import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPhenotypeAnnotations} from "../redux/selectors/phenotypeAnnotationsSelector";
import {deletePhenotypeAnnotation, setPhenotypeTmpAnnotation} from "../redux/actions/phenotypeAnnotationsActions";
import {setActiveView} from "../redux/actions/internalStateActions";
import PhenotypeAnnotationTable from "../components/PhenotypeAnnotationTable";

class PhenotypeAnnotationsViewer extends Component{

    render() {
        return (
            <PhenotypeAnnotationTable annotations={this.props.phenotypeAnnotations}
                                      deleteAnnotation={(a) => this.props.deletePhenotypeAnnotation(a.annotationId)}
                                      modifyAnnotation={(a) => {
                                          this.props.setPhenotypeTmpAnnotation(a);
                                          this.props.setActiveView("annotator");
                                      }}
                                      showAnnotationIds={this.props.showAnnotationIds}/>
        );
    }
}

const mapStateToProps = state => ({
    phenotypeAnnotations: getPhenotypeAnnotations(state)
});

export default connect(mapStateToProps, {deletePhenotypeAnnotation, setActiveView, setPhenotypeTmpAnnotation})(PhenotypeAnnotationsViewer);
