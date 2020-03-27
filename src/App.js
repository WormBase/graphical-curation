import React, {Component} from 'react';
import './App.css';
import store from "./redux/store";
import Main from "./components/Main";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

class App extends Component{

  render() {
    return(
        <Provider store={store}>
            <Router>
                <Main/>
            </Router>
        </Provider>
    );
  }
}

export default App;
