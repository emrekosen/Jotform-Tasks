import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard } from "../actions/boardActions";
import { getTasks } from "../actions/taskActions";
import CreateTaskGroup from "./CreateTaskGroup";

class Board extends Component {
  state = {
    isLoading: true,
    isAdding: false
  };

  componentDidUpdate(prevProps) {
    const { getBoard, match, getTasks } = this.props;
    if (prevProps.match.params.boardID !== match.params.boardID) {
      getBoard(match.params.boardID).then(response => {
        const { board } = this.props;

        getTasks(board.taskGroups);
      });
    }
  }

  componentDidMount() {
    const { getBoard, getTasks, match } = this.props;
    getBoard(match.params.boardID).then(response => {
      const { board } = this.props;
      getTasks(board.taskGroups).then(() => {
        this.setState({
          isLoading: false
        });
      });
    });
  }

  toggleTaskGroupAddBar = () => {
    this.setState({
      ...this.state,
      isAdding: !this.state.isAdding
    });
  };

  render() {
    const { task } = this.props;
    const { isLoading, isAdding } = this.state;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        {task.taskGroups.map(taskGroup => {
          return (
            <div key={taskGroup.taskGroupID}>
              {isAdding ? (
                <CreateTaskGroup toggleBar={this.toggleTaskGroupAddBar} />
              ) : (
                <div className="d-flex justify-content-between">
                  <h5>{taskGroup.name}</h5>
                  <button onClick={this.toggleTaskGroupAddBar}>+</button>
                </div>
              )}

              <hr
                style={{
                  border: "1px solid black",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem"
                }}
              />
              {taskGroup.tasks.map(task => {
                return <p key={task.taskID}>{task.task}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getBoard: getBoard,
  getTasks: getTasks
};

const mapStateToProps = ({ user, board, task }) => {
  return {
    user,
    board,
    task
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
