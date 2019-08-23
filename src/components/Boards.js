import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeam } from "../actions/teamActions";
import { getUserTeams } from "../actions/userActions";
import { Spinner } from "reactstrap";

class Boards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentDidUpdate(prevProps) {
    const { getTeam, match, team } = this.props;
    if (match.params.teamID !== prevProps.match.params.teamID) {
      getTeam(match.params.teamID);
    }
  }

  componentDidMount() {
    const { getTeam, getUserTeams, user, match } = this.props;
    if (!user.isLoaded) {
      getTeam(match.params.teamID).then(() => {
        getUserTeams().then(() => {
          this.setState({
            isLoaded: true
          });
        });
      });
    } else {
      getTeam(match.params.teamID).then(() => {
        this.setState({
          isLoaded: true
        });
      });
    }
  }

  render() {
    const { isLoaded } = this.state;
    const { team } = this.props;
    if (!isLoaded) {
      return (
        <div className="text-center">
          <Spinner
            style={{ width: "5rem", height: "5rem", color: "#7386d5" }}
            type="grow"
          />
        </div>
      );
    } else {
      return (
        <div>
          <h1>{`${team.teamName}'s Boards`}</h1>
          {team.boards.map(board => {
            return <h3 key={board.boardID}>{board.boardName}</h3>;
          })}
        </div>
      );
    }
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
