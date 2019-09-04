import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserTeams } from "../actions/userActions";
import { getTeamBoards } from "../actions/boardActions";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import Container from "./Container";
import Avatar from "react-avatar";

class Teams extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { getUserTeams } = this.props;
    getUserTeams().then(() => {
      this.setState({
        ...this.state,
        isLoaded: true
      });
    });
  }

  render() {
    const { teams } = this.props.user;
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div className="text-center">
          <Spinner
            style={{ width: "5rem", height: "5rem", color: "#7386d5" }}
            type="grow"
          />
        </div>
      );
    }
    return (
      <Container>
        <h1>Teams</h1>
        <div className="custom-container">
          {teams.map(team => {
            return (
              <div key={team.teamID} className="custom-column">
                <Link to={`/${team.teamID}/boards`}>
                  <Avatar
                    className="team-icon"
                    round="1rem"
                    name={`${team.teamName} ${team.teamName.substr(2)}`}
                  />
                  <h4>{team.teamName}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getUserTeams: getUserTeams,
  getTeamBoards: getTeamBoards
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);
