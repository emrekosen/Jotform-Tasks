import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";

import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Board from "./components/Board";
import Boards from "./components/Boards";
import allReducers from "./reducers";
import history from "./utils/history";
import Teams from "./components/Teams";
import Container from "./components/Container";
import ProtectedRoute from "./components/ProtectedRoute";
import NoUser from "./components/NoUser";

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
      <CookiesProvider>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/error" component={NoUser} />
              <ProtectedRoute exact path="/teams" component={Teams} />
              <ProtectedRoute path="/:teamID/boards" component={Boards} />
              <ProtectedRoute path="/:teamID/:boardID" component={Board} />
            </Switch>
          </Router>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
