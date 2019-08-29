import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
class HomePage extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    cookie.save("username", user.username, { path: "/" });
    cookie.save("email", user.email, { path: "/" });
    cookie.save("avatarUrl", user.avatarUrl, { path: "/" });
  }

  render() {
    const { auth } = this.props;
    if (!auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <h1 className="h1">HomePage</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};
export default connect(mapStateToProps)(HomePage);
