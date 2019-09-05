import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uniqid from "uniqid";

import JoinTeamModal from "./JoinTeamModal";
import CreateBoardModal from "./CreateBoardModal";
import { toggleHandler } from "../actions/sidebarActions";

//set links and redirects

class Sidebar extends Component {
  state = {
    localUser: {
      username: "",
      email: "",
      avatarUrl: ""
    }
  };

  componentDidMount() {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser !== null) {
      this.setState({
        localUser: localUser
      });
    }
  }

  render() {
    const { user, team, toggleSidebar } = this.props;
    const { localUser } = this.state;
    return (
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <img
            id="avatar"
            src={localUser.avatarUrl}
            className="mx-auto d-block"
            alt=""
          />
          <p style={{ paddingBottom: 0 }} className="text-center">
            Welcome {localUser.username}
          </p>
          <p style={{ marginTop: 0, paddingTop: 0 }} className="text-center">
            {team.teamName}
          </p>
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
                <JoinTeamModal
                  buttonLabel="Join/Create a Team"
                  isSidebar="true"
                />
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
                <CreateBoardModal
                  buttonLabel="Create a Board"
                  isSidebar="true"
                />
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
