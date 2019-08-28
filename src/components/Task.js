import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../actions/taskActions";

class Task extends Component {
  render() {
    const { id, task, assignedBy, user, deleteTask, submissionID } = this.props;
    return (
      <li
        key={id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {task}
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
