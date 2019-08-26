import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CreateTask extends Component {
  state = {
    isAdding: false,
    dueDate: new Date(),
    assignee: ""
  };

  handleChange = date => {
    this.setState({
      ...this.state,
      dueDate: date
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

  render() {
    const { isAdding } = this.state;
    const { team, taskGroupID } = this.props;
    return isAdding ? (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="task">Task</label>
              <input id="task" type="text" className="form-control" />
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
              <label htmlFor="datePicker">Due Date</label>
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
            <a href="#" className="btn btn-primary">
              Add Task
            </a>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps)(CreateTask);
