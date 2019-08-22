import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard } from "../actions/boardActions";
import { getTasks } from "../actions/taskActions";
class Board extends Component {
  state = {
    isLoading: true
  };

  componentDidUpdate(prevProps) {
    const { getBoard, match, getTasks } = this.props;
    if (prevProps.match.params.boardID !== match.params.boardID) {
      getBoard(match.params.boardID).then(response => {
        const { board } = this.props;
        console.log("update get tasks");
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

  render() {
    const { task } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return task.taskGroups.map(taskGroup => {
      console.log(taskGroup);
      return (
        <div key={taskGroup.taskGroupID}>
          <h5>{taskGroup.name}</h5>
          {taskGroup.tasks.map(task => {
            return <p key={task.taskID}>{task.task}</p>;
          })}
        </div>
      );
    });
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
