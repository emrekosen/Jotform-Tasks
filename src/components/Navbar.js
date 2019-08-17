import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHandler } from "../actions/sidebarActions";

class Navbar extends Component {
  render() {
    const { toggleSidebar, auth } = this.props;
    return (

      <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

          {auth.isLoggedIn ? <button type="button" id="sidebarCollapse" class="btn text-sidebar bg-turbo-yellow" onClick={toggleSidebar}>
            Menu
            <span></span>
          </button> : null}
          <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-align-justify"></i>

          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Page</a>
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

}

const mapDispatchToProps = {
  toggleSidebar: toggleHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
