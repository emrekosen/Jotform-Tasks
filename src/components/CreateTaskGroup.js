import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input
} from "reactstrap";
import { addTaskGroup } from "../actions/taskActions";

class CreateTaskGroup extends Component {
  state = {
    taskGroupName: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addTask = () => {
    const { addTaskGroup, toggleBar } = this.props;
    const { taskGroupName } = this.state;
    addTaskGroup(taskGroupName);
    this.setState({
      taskGroupName: ""
    });
    toggleBar();
  };

  render() {
    const { toggleBar } = this.props;
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend" onClick={toggleBar}>
          <Button>&times;</Button>
        </InputGroupAddon>
        <Input
          placeholder="Task group name"
          name="taskGroupName"
          value={this.state.taskGroupName}
          onChange={this.changeHandler}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={this.addTask} color="primary">
            Add
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

const mapDispatchToProps = {
  addTaskGroup: addTaskGroup
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTaskGroup);
