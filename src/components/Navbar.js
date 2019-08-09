import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHandler } from "../actions/sidebarActions";

class Navbar extends Component {
  render() {
    const { toggleSidebar } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button
          className="btn btn-primary"
          id="menu-toggle"
          onClick={toggleSidebar}
        >
          Menu
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="http://">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="http://"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="http://">
                  Action
                </a>
                <a className="dropdown-item" href="http://">
                  Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="http://">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  toggleSidebar: toggleHandler
};

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
