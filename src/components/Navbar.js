import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHandler } from "../actions/sidebarActions";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { logoutHandler } from "../actions/authActions";

class Navbar extends Component {
  render() {
    const { toggleSidebar, logoutHandler, auth, user } = this.props;
    const localUser = JSON.parse(localStorage.getItem("user"));
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {localUser !== null ? (
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary text-sidebar"
              onClick={toggleSidebar}
            >
              Menu
              <span />
            </button>
          ) : null}
          <a className="navbar-brand" href="#">
            <img
              id="brandLogo"
              src="https://www.jotform.com/resources/assets/svg/jotform-icon-dark.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            ></img>
            Tasks
          </a>
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
                <Link className="nav-link" to={"/teams"}>
                  Teams
                </Link>
              </li>
              {localUser !== null ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="user">
                    <img id="navbarAvatar" src={localUser.avatarUrl} alt="" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    {/* <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem> */}
                    {/* <DropdownItem divider /> */}
                    <DropdownItem id="logout" onClick={logoutHandler}>
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <li>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};

const mapDispatchToProps = {
  toggleSidebar: toggleHandler,
  logoutHandler: logoutHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
