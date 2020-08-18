import React, {Component} from 'react';
import {connect} from "react-redux";
import {getExpressionAnnotations} from "../redux/selectors/expressionAnnotationsSelector";
import {deleteExpressionAnnotation, setExpressionTmpAnnotation} from "../redux/actions/expressionAnnotationsActions";
import {
    setActiveView
} from "../redux/actions/internalStateActions";
import ExpressionAnnotationTable from "../components/ExpressionAnnotationTable";

class ExpressionAnnotationsViewer extends Component{

    render() {
        return (
            <ExpressionAnnotationTable annotations={this.props.expressionAnnotations}
                                       deleteAnnotation={(a) => this.props.deleteExpressionAnnotation(a.annotationId)}
                                       modifyAnnotation={(a) => {
                                           this.props.setExpressionTmpAnnotation(a);
                                           this.props.setActiveView("annotator");
                                       }}
                                       showAnnotationIds={this.props.showAnnotationIds}/>
        );
    }
}

const mapStateToProps = state => ({
    expressionAnnotations: getExpressionAnnotations(state)
});

export default connect(mapStateToProps, {deleteExpressionAnnotation, setActiveView, setExpressionTmpAnnotation})(ExpressionAnnotationsViewer);
