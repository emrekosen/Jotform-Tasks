import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

class Container extends React.Component {
  render() {
    const { auth } = this.props;
    const localUser = JSON.parse(localStorage.getItem("user"));
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          {localUser !== null ? <Sidebar /> : null}
          <div id="content" className={localUser == null ? "active" : ""}>
            <div id="content-wrapper">{this.props.children}</div>
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
