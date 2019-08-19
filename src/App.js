import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Board from "./components/Board";
import Boards from "./components/Boards";
import allReducers from "./reducers";
import history from "./utils/history";
import Teams from "./components/Teams";

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
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/teams" component={Teams} />
            <Route path="/:teamID/boards" component={Boards} />
            <Route path="/:teamID/:boardID" component={Board} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
