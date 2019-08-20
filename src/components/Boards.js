import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeam } from "../actions/teamActions";
import { getUserTeams } from "../actions/userActions";
import Container from "./Container";
import { Spinner } from "reactstrap";

class Boards extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { getTeam, getUserTeams, user, match } = this.props;
    if (!user.isLoaded) {
      getUserTeams().then(() => {
        getTeam(match.params.teamID).then(() => {
          console.log("get team called");
          this.setState({
            isLoaded: true
          });
        });
      });
    } else {
      getTeam(match.params.teamID).then(() => {
        console.log("get team called");
        this.setState({
          isLoaded: true
        });
      });
    }
  }

  render() {
    const { isLoaded } = this.state;
    const { teamName } = this.props.team;
    if (!isLoaded) {
      return (
        <Container>
          <div className="text-center">
            <Spinner
              style={{ width: "5rem", height: "5rem", color: "#7386d5" }}
              type="grow"
            />
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <h1>{`${teamName}'s Boards`}</h1>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getTeam: getTeam,
  getUserTeams: getUserTeams
};

const mapStateToProps = ({ user, team }) => {
  return {
    user,
    team
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards);
