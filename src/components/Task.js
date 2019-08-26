import React, { Component } from "react";

class Task extends Component {
  render() {
    const { id, task } = this.props;
    return <p key={id}>{task}</p>;
  }
}

export default Task;
