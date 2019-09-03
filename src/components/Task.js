import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask, toggleDoneTask, getAvatar } from "../actions/taskActions";
import moment from "moment";

class Task extends Component {
  state = {
    assigneeAvatar: null
  };

  componentDidMount() {
    const { getAvatar, assignee } = this.props;
    getAvatar(assignee).then(avatarUrl => {
      this.setState({
        assigneeAvatar: avatarUrl
      });
    });
  }

  render() {
    const {
      taskID,
      task,
      assignedBy,
      user,
      submissionID,
      dueDate,
      isDone,
      deleteTask,
      toggleDoneTask
    } = this.props;
    const dateDiff =
      moment(moment(dueDate).format("L")).valueOf() -
      moment(moment().format("L")).valueOf();
    return (
      <li
        key={taskID}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          {isDone ? (
            <i
              className="fas fa-check-circle fa-lg"
              id="doneIconSDone"
              onClick={toggleDoneTask.bind(this, taskID)}
            ></i>
          ) : (
            <i
              className="fas fa-check-circle fa-lg"
              id="doneIconS"
              onClick={toggleDoneTask.bind(this, taskID)}
            ></i>
          )}
          <input defaultValue={task} />
        </div>

        <div className="d-flex align-items-center">
          <div
            id="dueDate"
            style={
              dateDiff < 0
                ? { backgroundColor: "#FA5F58", color: "white" }
                : { backgroundColor: "#44E344", color: "white" }
            }
          >
            {moment(dueDate).format("MMM Do")}{" "}
          </div>

          <img
            className="ml-2"
            id="assigneeAvatar"
            src={this.state.assigneeAvatar}
            alt=""
          />
          <div className="dropdown ml-3">
            <button
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              {true ? (
                <a className="dropdown-item">
                  <i id="trashIcon" className="fas fa-trash-alt mr-2"></i>Delete
                </a>
              ) : null}
              <a
                className="dropdown-item"
                href="#"
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-exchange-alt mr-2"></i>Change task group
              </a>
            </div>
          </div>
        </div>
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
  deleteTask: deleteTask,
  toggleDoneTask: toggleDoneTask,
  getAvatar: getAvatar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
