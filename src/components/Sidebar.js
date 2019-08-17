import React, { Component } from "react";
import { connect } from "react-redux";

class Sidebar extends Component {
  render() {
    const { user, team } = this.props
    return (
      <nav id="sidebar" class="active">
        <div class="sidebar-header">
          <h3>Jotform Tasks</h3>
        </div>

        <ul class="list-unstyled components">
          {/* <p>Dummy Heading</p> */}
          <li class="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">Teams</a>
            <ul class="collapse list-unstyled show" id="homeSubmenu">
              <li>
                <a href="#" class="justify-content-between"><i class="fas fa-user-plus"></i>  Join a Team</a>
              </li>
              {user.teams.map(team => {
                return (<li>
                  <a href="#">{team}</a>
                </li>)
              })}
            </ul>
          </li>
          <li>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Boards</a>
            <ul class="collapse list-unstyled" id="pageSubmenu">
              {team.boards.map(board => {
                return (
                  <li>
                    <a href="#">{board.boardName}</a>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ user, team }) => {
  return {
    user,
    team
  };
}

export default connect(mapStateToProps)(Sidebar);
