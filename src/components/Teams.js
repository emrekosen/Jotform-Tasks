import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserTeams } from "../actions/userActions";
import { getTeamBoards } from "../actions/boardActions";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import Container from "./Container";

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
        <div>
          <h1>Teams</h1>
          {teams.map(team => {
            return (
              <h3 key={team.teamID}>
                <Link to={`/${team.teamID}/boards`}>{team.teamName}</Link>
              </h3>
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
