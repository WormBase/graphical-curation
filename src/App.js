import React, {Component} from 'react';
import store from "./redux/store";
import GraphicalCuration from "./pages/GraphicalCuration";
import {Provider} from "react-redux";

class App extends Component{

  render() {
    return(
        <Provider store={store}>
            <GraphicalCuration {...this.props}/>
        </Provider>
    );
  }
}

export default App;
