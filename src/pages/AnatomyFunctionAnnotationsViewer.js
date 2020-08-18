import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAnatomyFunctionAnnotations} from "../redux/selectors/anatomyFunctionAnnotationsSelector";
import {deleteAnatomyFunctionAnnotation} from "../redux/actions/anatomyFunctionAnnotationsActions";
import {setActiveView, setAnatomyFunctionAnnotationForEditing} from "../redux/actions/internalStateActions";
import AnatomyFunctionAnnotationTable from "../components/AnatomyFunctionAnnotationTable";

class AnatomyFunctionAnnotationsViewer extends Component{

    render() {
        return (
            <AnatomyFunctionAnnotationTable annotations={this.props.anatomyFunctionAnnotations}
                                            deleteAnnotation={(a) => this.props.deleteAnatomyFunctionAnnotation(a.annotationId)}
                                            modifyAnnotation={(a) => {
                                                this.props.setAnatomyFunctionAnnotationForEditing(a);
                                                this.props.setActiveView("annotator");
                                            }}
                                            showAnnotationIds={this.props.showAnnotationIds}/>
        );
    }
}

const mapStateToProps = state => ({
    anatomyFunctionAnnotations: getAnatomyFunctionAnnotations(state)
});

export default connect(mapStateToProps, {deleteAnatomyFunctionAnnotation, setAnatomyFunctionAnnotationForEditing, setActiveView})(AnatomyFunctionAnnotationsViewer);
