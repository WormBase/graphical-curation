import React, {Component} from 'react';
import './App.css';
import {getExpressionAnnotations} from "./redux/selectors/expressionSelector";
import connect from "react-redux/lib/connect/connect";

class App extends Component{

  render() {
    let annotations = this.props.expressionAnnotations.forEach((a) => {return a.gene});
    return (
        {annotations}
    );
  }
}

const mapStateToProps = state => ({
    expressionAnnotations: getExpressionAnnotations(state)
});

export default connect(mapStateToProps, {})(App);
