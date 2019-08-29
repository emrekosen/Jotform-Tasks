import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard, deleteBoard } from "../actions/boardActions";
import { getTasks } from "../actions/taskActions";
import CreateTaskGroup from "./CreateTaskGroup";
import TaskGroup from "./TaskGroup";
import history from "../utils/history";
import { getTeam } from "../actions/teamActions";
import { getUserTeams } from "../actions/userActions";

class Board extends Component {
  state = {
    isLoading: true,
    isAdding: false
  };

  componentDidUpdate(prevProps) {
    const { match, getBoard, getTasks } = this.props;
    if (prevProps.match.params.boardID !== match.params.boardID) {
      getBoard(match.params.boardID).then(response => {
        const { board } = this.props;
        getTasks(board.taskGroups);
      });
    }
  }

  componentDidMount() {
    const {
      getBoard,
      getTasks,
      getTeam,
      getUserTeams,
      match,
      user
    } = this.props;
    if (!user.isLoaded) {
      getTeam(match.params.teamID).then(() => {
        getUserTeams().then(() => {
          getBoard(match.params.boardID).then(response => {
            const { board } = this.props;
            getTasks(board.taskGroups).then(() => {
              this.setState({
                isLoading: false
              });
            });
          });
        });
      });
    } else {
      getBoard(match.params.boardID).then(response => {
        const { board } = this.props;
        getTasks(board.taskGroups).then(() => {
          this.setState({
            isLoading: false
          });
        });
      });
    }
  }

  toggleTaskGroupAddBar = () => {
    this.setState({
      ...this.state,
      isAdding: !this.state.isAdding
    });
  };

  onDeleteBoard = e => {
    const { board, team, deleteBoard } = this.props;
    deleteBoard(board.boardID).then(() => {
      history.push(`/teams`);
    });
  };

  render() {
    const { board, deleteBoard } = this.props;
    const { isLoading, isAdding } = this.state;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <div className="d-flex justify-content-end align-items-end mb-5">
          {isAdding ? (
            <CreateTaskGroup toggleBar={this.toggleTaskGroupAddBar} />
          ) : (
            <div>
              {/* <h4>Add Task Group</h4> */}
              <button
                id="addTaskGroup"
                className="btn btn-primary"
                onClick={this.toggleTaskGroupAddBar}
              >
                Create Task Group
              </button>
            </div>
          )}
          <button className="btn btn-primary ml-2" onClick={this.onDeleteBoard}>
            <i className="fas fa-cog"></i>
          </button>
        </div>
        {board.taskGroups.length === 0 ? (
          <div className="text-center">
            <h4>
              There is no task group for this board. You can create with "Create
              Task Group" button.
            </h4>
          </div>
        ) : (
          board.taskGroups.map(taskGroup => {
            return (
              <TaskGroup
                key={taskGroup.taskGroupID}
                name={taskGroup.taskGroupName}
                id={taskGroup.taskGroupID}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getBoard: getBoard,
  getTasks: getTasks,
  deleteBoard: deleteBoard,
  getTeam: getTeam,
  getUserTeams: getUserTeams
};

const mapStateToProps = ({ user, board }) => {
  return {
    user,
    board
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
