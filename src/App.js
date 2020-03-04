import React, {Component} from 'react';
import './App.css';
import store from "./redux/store";
import Main from "./components/Main";
import {Provider} from "react-redux";

class App extends Component{

  render() {
    return(
        <Provider store={store}>
          <Main/>
        </Provider>
    );
  }
}

export default App;
