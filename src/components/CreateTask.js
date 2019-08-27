import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import { createTask } from "../actions/taskActions";

import "react-datepicker/dist/react-datepicker.css";

class CreateTask extends Component {
  state = {
    isAdding: false,
    dueDate: new Date(),
    assignee: "",
    task: ""
  };

  handleChange = date => {
    this.setState({
      ...this.state,
      dueDate: date
    });
  };

  handleTask = e => {
    this.setState({
      ...this.state,
      task: e.target.value
    });
  };

  onSelect = e => {
    this.setState({
      ...this.state,
      assignee: e.target.value
    });
  };

  toggleAddTaskBar = () => {
    this.setState({
      isAdding: !this.state.isAdding
    });
  };

  onAddTask = () => {
    const { createTask, taskGroupID } = this.props;
    const { dueDate, assignee, task } = this.state;
    const newDueDate = moment(dueDate).format("L");
    createTask({
      task,
      assignee,
      newDueDate,
      taskGroupID
    }).then(task => {
      this.setState({
        ...this.state,
        isAdding: false
      });
    });
    // let x = moment(moment(dueDate).format("L")).valueOf();
  };

  render() {
    const { isAdding } = this.state;
    const { team, taskGroupID } = this.props;
    return isAdding ? (
      <li className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>New Task</h5>
          <button type="button" class="close" onClick={this.toggleAddTaskBar}>
            <span>&times;</span>
          </button>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="task">Task</label>
              <input
                id="task"
                type="text"
                className="form-control"
                onChange={this.handleTask}
                value={this.state.task}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignee">Assignee</label>
              <select
                id="assignee"
                className="form-control"
                onChange={this.onSelect}
                placeholder="Select a assignee"
                value={this.state.assignee}
              >
                <option>Select a assignee</option>
                {team.users.map(user => {
                  return (
                    <option value={user.username} key={user.email}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              {/* <label htmlFor="datePicker">Due Date</label> */}
              <DatePicker
                id="datePicker"
                className="form-control"
                selected={this.state.dueDate}
                onChange={this.handleChange}
                minDate={new Date()}
                placeholderText="Select a due date"
              />
            </div>
          </form>
          <div className="d-flex justify-content-end">
            <button onClick={this.onAddTask} className="btn btn-primary">
              Add Task
            </button>
          </div>
        </div>
      </li>
    ) : (
      <li onClick={this.toggleAddTaskBar} className="list-group-item ">
        <i className="fas fa-plus" /> Add Task
      </li>
    );
  }
}

const mapStateToProps = ({ team }) => {
  return {
    team
  };
};

const mapDispatchToProps = {
  createTask: createTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask);
