import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import Container from "./Container";

class LoginPage extends Component {
  render() {
    // add isLoggedIn
    const { authError } = this.props.auth;
    // if (isLoggedIn) {
    //   return <Redirect to="/" />;
    // }
    return (
      <Container>
        <div className="container mt-5">
          {authError === null ? null : (
            <div className="alert alert-danger" role="alert">
              {authError}
            </div>
          )}
          <LoginForm />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(LoginPage);
