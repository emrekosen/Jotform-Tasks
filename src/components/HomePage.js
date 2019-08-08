import React from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";


class HomePage extends React.Component {
  render() {
    if(!this.props.auth.isLoggedIn){
      return (<Redirect to="/login"/>
      );
    }
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};
export default connect(mapStateToProps)(HomePage);
