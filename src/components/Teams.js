import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserTeams } from "../actions/userActions";
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
        <Container>
          <h1>Loading...</h1>
        </Container>
      );
    }
    return (
      <Container>
        {teams.map(team => {
          return <h1 key={team.teamID}>{team.teamName}</h1>;
        })}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getUserTeams: getUserTeams
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
