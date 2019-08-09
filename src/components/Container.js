import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

class Container extends React.Component {
  render() {
    return (
      <div className="d-flex toggled" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Navbar />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
