import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../actions/taskActions";

class Task extends Component {
  render() {
    const {
      id,
      task,
      assignedBy,
      user,
      deleteTask,
      submissionID,
      isDone
    } = this.props;
    return (
      <li
        key={id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          {isDone ? (
            <i class="fas fa-check-circle fa-lg" id="doneIconS"></i>
          ) : (
            <i class="far fa-check-circle fa-lg" id="doneIconR"></i>
          )}
          {task}
        </div>

        {user.username === assignedBy ? (
          <i
            id="trashIcon"
            className="fas fa-trash-alt"
            onClick={deleteTask.bind(this, submissionID)}
          ></i>
        ) : null}
      </li>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = {
  deleteTask: deleteTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
