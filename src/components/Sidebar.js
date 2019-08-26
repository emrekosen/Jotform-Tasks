import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uniqid from "uniqid";

import JoinTeamModal from "./JoinTeamModal";
import CreateBoardModal from "./CreateBoardModal";
import { toggleHandler } from "../actions/sidebarActions";

//set links and redirects

class Sidebar extends Component {
  render() {
    const { user, team, toggleSidebar } = this.props;
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Jotform Tasks</h3>
        </div>

        <ul className="list-unstyled components">
          <img
            src={user.avatarUrl}
            className="rounded mx-auto d-block"
            alt=""
          />
          <p className="text-center">Welcome {user.username}</p>
          <li>
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="true"
              className="dropdown-toggle"
            >
              Teams
            </a>
            <ul className="collapse list-unstyled show" id="homeSubmenu">
              <li>
                <JoinTeamModal buttonLabel="Join/Create a Team" />
              </li>
              {user.teams.map(team => {
                return (
                  <li key={uniqid()}>
                    <Link to={`/${team.teamID}/boards`}>{team.teamName}</Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              {team.teamName} Boards
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <CreateBoardModal buttonLabel="Create a Board" />
              </li>
              {team.boards.map(board => {
                return (
                  <li key={uniqid()}>
                    <Link to={`/${team.teamID}/${board.boardID}`}>
                      {board.boardName}
                    </Link>
                  </li>
                );
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
};

const mapDispatchToProps = {
  toggleSidebar: toggleHandler
};

export default connect(mapStateToProps)(Sidebar);
