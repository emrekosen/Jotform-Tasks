import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import allReducers from "./reducers";

class App extends React.Component {
  render() {
    const store = createStore(
      allReducers,
      {},
      compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
