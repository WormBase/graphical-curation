import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Main from "./Main";

class App extends Component{

    render() {
        return(
            <Router>
                <Main/>
            </Router>
        );
    }
}

export default App;
