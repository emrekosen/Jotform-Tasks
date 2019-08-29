import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

class Container extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <Navbar />

        <div className="wrapper">
          {auth.isLoggedIn ? <Sidebar /> : null}
          <div id="content">
            <div id="contentWrapper">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Container);
