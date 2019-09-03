import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import history from "../utils/history";
import Container from "./Container";
class HomePage extends React.Component {
  componentDidMount() {
    const localUser = localStorage.getItem("user");
    if (localUser !== null) {
      history.push("/teams");
    }
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     username: "ekosen",
    //     email: "kosenemre@gmail.com",
    //     avatarUrl: "https://www.jotform.com/images/avatars/avatar-59.png"
    //   })
    // );
  }

  render() {
    return (
      <Container>
        <div className="container">
          <h1 className="h1">HomePage</h1>
        </div>
      </Container>
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
