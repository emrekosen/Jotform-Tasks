import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteTask,
  toggleDoneTask,
  getAvatar,
  changeTask
} from "../actions/taskActions";
import moment from "moment";

class Task extends Component {
  state = {
    assigneeAvatar: null,
    task: this.props.task,
    mobileDetail: false
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      task: e.target.value
    });
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
      assignedBy,
      user,
      submissionID,
      dueDate,
      isDone,
      deleteTask,
      toggleDoneTask,
      changeTask
    } = this.props;
    const { task, mobileDetail } = this.state;
    const dateDiff =
      moment(moment(dueDate).format("L")).valueOf() -
      moment(moment().format("L")).valueOf();
    return (
      <div key={taskID}>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center done-task-group">
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
            <input
              className="task"
              defaultValue={task}
              onChange={this.handleChange}
              onBlur={changeTask.bind(this, { taskID, newTask: task })}
            />
          </div>

          <div id="task-detail" className="align-items-center">
            <div
              id="due-date"
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
              id="assignee-avatar"
              src={this.state.assigneeAvatar}
              alt=""
            />
            <div className="dropdown ml-3">
              <button
                type="button"
                id="dropdown-menu-button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-menu-button"
              >
                {true ? (
                  <a
                    className="dropdown-item"
                    onClick={deleteTask.bind(this, submissionID)}
                  >
                    <i id="trashIcon" className="fas fa-trash-alt mr-2"></i>
                    Delete
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
          <div id="mobile-detail" className="align-items-center">
            <button
              type="button"
              id="dropdown-menu-button"
              onClick={() => {
                this.setState({
                  ...this.state,
                  mobileDetail: !this.state.mobileDetail
                });
              }}
            ></button>
          </div>
        </li>
        {/* MOBILE DETAIL PART */}
        <li
          id="mobile-detail-li"
          className="list-group-item align-items-center"
          style={{
            display: mobileDetail ? "flex" : "none"
          }}
        >
          <div className="d-flex align-items-center">
            <div
              id="mobile-due-date"
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
              id="mobile-assignee-avatar"
              src={this.state.assigneeAvatar}
              alt=""
            />
          </div>
        </li>
      </div>
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
  getAvatar: getAvatar,
  changeTask: changeTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
