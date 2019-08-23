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
              className="btn btn-primary text-sidebar"
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
                <Link className="nav-link" to={"/teams"}>
                  Teams
                </Link>
              </li>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="user">
                  {/* {user.username} */}
                  User
                </DropdownToggle>
                <DropdownMenu right>
                  {/* <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem id="logout">Log out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
  toggleSidebar: toggleHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
