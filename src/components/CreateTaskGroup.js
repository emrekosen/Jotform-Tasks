import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  InputGroupAddon,
  // InputGroupText,
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

  render() {
    const { addTaskGroup } = this.props;
    const { taskGroupName } = this.state;
    return (
      <InputGroup>
        <Input
          placeholder="Task group name"
          name="taskGroupName"
          value={this.state.taskGroupName}
          onChange={this.changeHandler}
        />
        <InputGroupAddon addonType="append">
          <Button
            onClick={addTaskGroup.bind(this, taskGroupName)}
            color="primary"
          >
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
