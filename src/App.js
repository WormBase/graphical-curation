import React, {Component} from 'react';
import store from "./redux/store";
import GraphicalCuration from "./components/GraphicalCuration";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

class Main extends Component{

  render() {
    return(
        <Provider store={store}>
            <Router>
                <GraphicalCuration/>
            </Router>
        </Provider>
    );
  }
}

export default Main;
