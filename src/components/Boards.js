import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeam, deleteTeam } from "../actions/teamActions";
import { getUserTeams } from "../actions/userActions";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import Container from "./Container";

class Boards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentDidUpdate(prevProps) {
    const { getTeam, match } = this.props;
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
    const { team, deleteTeam } = this.props;

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
    } else {
      return (
        <Container>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h1>{`${team.teamName}'s Boards`}</h1>
              <button
                className="btn btn-primary ml-2"
                onClick={deleteTeam.bind(this, team.teamID)}
              >
                <i className="fas fa-cog"></i>
              </button>
            </div>

            <div className="mt-5">
              {team.boards.map(board => {
                return (
                  <div key={board.boardID}>
                    <Link to={`/${team.teamID}/${board.boardID}`}>
                      {board.boardName}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      );
    }
  }
}

const mapDispatchToProps = {
  getTeam: getTeam,
  getUserTeams: getUserTeams,
  deleteTeam: deleteTeam
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
