import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import CreateTask from "./CreateTask";

class TaskGroup extends Component {
  render() {
    const { id, name, tasks } = this.props;
    return (
      <div className="card mt-5 mb-5">
        <div className="card-header">
          <h5>{name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          {false ? (
            <li className="list-group-item">
              There is no task for this task group.
            </li>
          ) : (
            tasks.map(task => {
              return <Task key={task.taskID} task={task.task} />;
            })
          )}
        </ul>
        <CreateTask taskGroupID={id} />
      </div>
    );
  }
}

export default connect()(TaskGroup);
