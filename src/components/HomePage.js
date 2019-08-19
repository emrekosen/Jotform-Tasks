import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "./Container";
import { getTeams } from "../actions/userActions";

class HomePage extends React.Component {
  render() {
    const { auth } = this.props;
    if (!auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <Container>
        <div className="container">
          <h1 className="h1">HomePage</h1>
          <button onClick={getTeams} />
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
export default connect(mapStateToProps)(HomePage);
