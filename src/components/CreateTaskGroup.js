import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  // InputGroupText,
  Button,
  Input
} from "reactstrap";

export default class CreateTaskGroup extends Component {
  render() {
    return (
      <InputGroup>
        <Input placeholder="Task group name" />
        <InputGroupAddon addonType="append">
          <Button onClick={this.props.toggleBar} color="primary">
            Add
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}
