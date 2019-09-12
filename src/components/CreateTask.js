import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import { createTask } from "../actions/taskActions";
import { Button, Form, Select, Dropdown, Segment } from "semantic-ui-react";
import { getAvatar } from "../actions/taskActions";
import "react-datepicker/dist/react-datepicker.css";

class CreateTask extends Component {
  state = {
    isAdding: false,
    dueDate: new Date(),
    assignee: "",
    task: "",
    tag: {}
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

  handleAssignee = (e, { value }) => {
    this.setState({
      ...this.state,
      assignee: value
    });
  };

  handleTag = (e, { value }) => {
    const values = value.split("-");
    this.setState({
      ...this.state,
      tag: { name: values[0], color: values[1] }
    });
  };

  toggleAddTaskBar = () => {
    this.setState({
      isAdding: !this.state.isAdding
    });
  };

  onAddTask = () => {
    const { createTask, taskGroupID } = this.props;
    const { dueDate, assignee, task, tag } = this.state;
    const newDueDate = moment(dueDate).format("L");
    createTask({
      task,
      assignee,
      newDueDate,
      taskGroupID,
      tag
    }).then(task => {
      this.setState({
        isAdding: false,
        dueDate: new Date(),
        assignee: "",
        task: ""
      });
    });
    // let x = moment(moment(dueDate).format("L")).valueOf();
  };

  render() {
    const { isAdding } = this.state;
    const { team, taskGroupID, board } = this.props;
    const assignees = team.users.map(user => {
      return {
        key: user.email,
        text: user.username,
        value: user.username,
        image: { avatar: true, src: user.avatarUrl }
      };
    });
    const tags = board.tags.map(tag => {
      return {
        key: tag.color,
        text: tag.name,
        value: tag.name + "-" + tag.color,
        label: { color: tag.color, empty: true, circular: true }
      };
    });
    return isAdding ? (
      <Segment>
        <Form>
          <Form.Input
            label="Task"
            value={this.state.task}
            onChange={this.handleTask}
          ></Form.Input>
          <Form.Group widths="two">
            <Form.Select
              placeholder="Select a assignee"
              fluid
              onChange={this.handleAssignee}
              selection
              options={assignees}
            ></Form.Select>
            <DatePicker
              id="date-picker"
              className="create-task-datepicker"
              selected={this.state.dueDate}
              onChange={this.handleChange}
              minDate={new Date()}
              placeholderText="Select a due date"
            />
            <Form.Select
              placeholder="Select a tag"
              fluid
              onChange={this.handleTag}
              selection
              options={tags}
            ></Form.Select>
          </Form.Group>
          <Button
            style={{ backgroundColor: "#7386d5", color: "white" }}
            onClick={this.onAddTask}
          >
            Add Task
          </Button>
          <Button style={{ color: "#7386d5" }} onClick={this.toggleAddTaskBar}>
            Cancel
          </Button>
        </Form>
      </Segment>
    ) : (
      // <li id="add-task-card" className="card">
      //   <div className="card-header d-flex justify-content-between align-items-center">
      //     <h5>New Task</h5>
      //     <button
      //       type="button"
      //       className="close"
      //       onClick={this.toggleAddTaskBar}
      //     >
      //       <span>&times;</span>
      //     </button>
      //   </div>
      //   <div className="card-body">
      //     <form>
      //       {/* ------------------------- */}
      //       <div className="input-group custom-input-group">
      //         <div className="input-group-prepend">
      //           <span className="input-group-text">
      //             <i className="fas fa-clipboard-check fa-lg"></i>
      //           </span>
      //         </div>
      //         <input
      //           placeholder="Task"
      //           id="task-input"
      //           type="text"
      //           className="form-control"
      //           onChange={this.handleTask}
      //           value={this.state.task}
      //         />
      //         {/* ------------------------- */}
      //       </div>
      //       <div className="input-group custom-input-group">
      //         <div className="input-group-prepend">
      //           <span className="input-group-text">
      //             <i className="fas fa-user fa-lg"></i>
      //           </span>
      //         </div>
      //         <select
      //           id="assignee"
      //           className="form-control"
      //           onChange={this.onSelect}
      //           placeholder="Select a assignee"
      //           value={this.state.assignee}
      //         >
      //           <option>Select a assignee</option>
      //           {team.users.map(user => {
      //             return (
      //               <option value={user.username} key={user.email}>
      //                 {user.username}
      //               </option>
      //             );
      //           })}
      //         </select>
      //       </div>
      //       {/* ------------------------- */}
      //       <div className="input-group custom-input-group">
      //         <div className="input-group-prepend">
      //           <span className="input-group-text">
      //             <i className="far fa-calendar-check fa-lg"></i>
      //           </span>
      //         </div>
      //         {/* <label htmlFor="datePicker">Due Date</label> */}
      //         <DatePicker
      //           id="date-picker"
      //           className="form-control"
      //           selected={this.state.dueDate}
      //           onChange={this.handleChange}
      //           minDate={new Date()}
      //           placeholderText="Select a due date"
      //         />
      //       </div>
      //     </form>
      //     {/* ------------------------- */}
      //     <div className="d-flex justify-content-end">
      //       <button onClick={this.onAddTask} className="btn btn-primary">
      //         Add Task
      //       </button>
      //     </div>
      //   </div>
      // </li>
      <Segment onClick={this.toggleAddTaskBar} style={{ cursor: "pointer" }}>
        <i id="addTaskIcon" className="fas fa-plus-circle fa-lg" />
        Add Task
      </Segment>
      // <li
      //   onClick={this.toggleAddTaskBar}
      //   className="list-group-item"
      //   id="add-task"
      // >
      //   <i id="addTaskIcon" className="fas fa-plus-circle fa-lg" />
      //   Add Task
      // </li>
    );
  }
}

const mapStateToProps = ({ team, board }) => {
  return {
    team,
    board
  };
};

const mapDispatchToProps = {
  createTask: createTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask);
