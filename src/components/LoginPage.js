import React, { Component } from "react";
import LoginForm from "./LoginForm";
import Container from "./Container";

class LoginPage extends Component {
  render() {
    return (
      <Container>
        <div className="container mt-5">
          <LoginForm />
        </div>
      </Container>
    );
  }
}

export default LoginPage;
