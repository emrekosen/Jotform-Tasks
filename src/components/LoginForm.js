import React, { Component } from "react";
import { connect } from "react-redux";

import validateLogin from "../utils/LoginValidate";
import { loginHandler } from "../actions/authActions";


class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = e => {
    const { loginHandler } = this.props;
    e.preventDefault();
    e.target.classList.add("was-validated");

    if (validateLogin(this.state)) {
      loginHandler(this.state);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { username, password } = this.state;
    const { authError } = this.props.auth;
    return (
      <form
        onSubmit={this.onSubmit}
        className="needs-validation w-75 ml-auto mr-auto"
        noValidate
      >
        <h1 className="h1 mb-4 font-weight-normal">Please sign in</h1>
        {authError === null ? null : (
          <div className="alert alert-danger" role="alert">
            {authError}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="validationCustomUsername">Username</label>
          <input
            required
            type="text"
            className="form-control"
            id="validationCustomUsername"
            placeholder="Enter username"
            name="username"
            onChange={this.onChange}
            value={username}
          />
          <div className="invalid-feedback">Please enter a valid username</div>
        </div>
        <div className="form-group">
          <label htmlFor="validationCustomPassword">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="validationCustomPassword"
            placeholder="Password"
            name="password"
            onChange={this.onChange}
            value={password}
          />
          <div className="invalid-feedback">Please enter a valid password</div>
        </div>
        <button type="submit" className="btn btn-primary float-right">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispatchToProps = {
  loginHandler: loginHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
