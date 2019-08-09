import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";

class LoginPage extends Component {
  render() {
    const { authError, isLoggedIn } = this.props.auth;
    // if (isLoggedIn) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="container mt-5">
        {authError === null ? null : (
          <div className="alert alert-danger" role="alert">
            {authError}
          </div>
        )}
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(LoginPage);
