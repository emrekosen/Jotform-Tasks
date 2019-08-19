import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHandler } from "../actions/sidebarActions";

class Navbar extends Component {
  render() {
    const { toggleSidebar, auth } = this.props;
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {auth.isLoggedIn ? (
            <button
              type="button"
              id="sidebarCollapse"
              className="btn text-sidebar bg-turbo-yellow"
              onClick={toggleSidebar}
            >
              Menu
              <span />
            </button>
          ) : null}
          <button
            className="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-align-justify" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="http">
                  Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="a">
                  Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="a">
                  Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="a">
                  Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispatchToProps = {
  toggleSidebar: toggleHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
