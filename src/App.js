import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import allReducers from "./reducers";
import history from "./utils/history";

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
        <Container>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/" render={HomePage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </Router>
        </Container>
      </Provider>
    );
  }
}

export default App;
