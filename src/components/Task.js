import React, { Component } from "react";

class Task extends Component {
  render() {
    const { id, task } = this.props;
    return (
      <div>
        <li key={id} className="list-group-item">
          {task}
        </li>
      </div>
    );
  }
}

export default Task;
