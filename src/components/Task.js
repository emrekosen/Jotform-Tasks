import React, { Component } from "react";

class Task extends Component {
  render() {
    const { id, task } = this.props;
    return (
      <li key={id} className="list-group-item">
        {task}
      </li>
    );
  }
}

export default Task;
