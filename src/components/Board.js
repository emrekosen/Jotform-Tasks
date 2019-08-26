import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard } from "../actions/boardActions";
import { getTasks } from "../actions/taskActions";
import CreateTaskGroup from "./CreateTaskGroup";
import TaskGroup from "./TaskGroup";

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
        <div className="mb-5">
          {isAdding ? (
            <CreateTaskGroup toggleBar={this.toggleTaskGroupAddBar} />
          ) : (
            <div className="d-flex justify-content-end align-items-end">
              {/* <h4>Add Task Group</h4> */}
              <button
                id="addTaskGroup"
                className="btn btn-primary"
                onClick={this.toggleTaskGroupAddBar}
              >
                Add Task Group
              </button>
            </div>
          )}
        </div>
        {task.taskGroups.map(taskGroup => {
          return (
            <TaskGroup
              name={taskGroup.name}
              id={taskGroup.taskGroupID}
              tasks={taskGroup.tasks}
            />
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
