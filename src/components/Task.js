import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
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
    dueDate: this.props.dueDate,
    mobileDetail: false
  };

  componentDidMount() {
    const { getAvatar, assignee } = this.props;
    getAvatar(assignee).then(avatarUrl => {
      this.setState({
        assigneeAvatar: avatarUrl
      });
    });
  }

  changeTaskHandler = (dueDate, e) => {
    const { changeTask, taskID } = this.props;
    changeTask({
      taskID,
      newTask: this.state.task,
      newDueDate: dueDate
    });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      task: e.target.value
    });
  };

  handleDueDate = date => {
    this.setState({
      ...this.state,
      dueDate: date
    });
    this.changeTaskHandler(date);
  };

  render() {
    const {
      taskID,
      assignedBy,
      user,
      submissionID,
      isDone,
      deleteTask,
      toggleDoneTask,
      changeTask
    } = this.props;
    const { task, dueDate, mobileDetail } = this.state;
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
              onBlur={this.changeTaskHandler.bind(this, dueDate)}
            />
          </div>
          {/* TASK DETAIL */}
          <div id="task-detail" className="align-items-center">
            <DatePicker
              className={
                dateDiff < 0
                  ? "date-picker date-picker-red"
                  : "date-picker date-picker-green"
              }
              selected={moment(dueDate).toDate()}
              onChange={this.handleDueDate}
              minDate={new Date()}
              dateFormat="MMMM d"
            />
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
          className="list-group-item align-items-center justify-content-between "
          style={{
            display: mobileDetail ? "flex" : "none"
          }}
        >
          <div>
            <DatePicker
              className={
                dateDiff < 0
                  ? "date-picker date-picker-red"
                  : "date-picker date-picker-green"
              }
              selected={moment(dueDate).toDate()}
              onChange={this.handleDueDate}
              minDate={new Date()}
              dateFormat="MMMM d"
            />

            <img
              className="ml-2"
              id="mobile-assignee-avatar"
              src={this.state.assigneeAvatar}
              alt=""
            />
          </div>
          <div>
            {true ? (
              <button
                className="btn btn-primary mr-2"
                onClick={deleteTask.bind(this, submissionID)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            ) : null}
            <button className="btn btn-primary">
              <i className="fas fa-exchange-alt"></i>
            </button>
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
