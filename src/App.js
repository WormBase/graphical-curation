import React, {Component} from 'react';
import store from "./redux/store";
import GraphicalCuration from "./pages/GraphicalCuration";
import {Provider} from "react-redux";
import {CookiesProvider} from "react-cookie";

class App extends Component{

  render() {
    return(
        <CookiesProvider>
            <Provider store={store}>
                <GraphicalCuration {...this.props}/>
            </Provider>
        </CookiesProvider>
    );
  }
}

export default App;
