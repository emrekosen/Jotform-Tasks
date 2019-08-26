import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";

class TaskGroup extends Component {
  render() {
    const { id, name, tasks } = this.props;
    return (
      <div className="mt-5 mb-5" key={id}>
        <h5>{name}</h5>
        <hr
          className="mt-3"
          style={{
            border: "1px solid black"
          }}
        />
        {tasks.map(task => {
          return <Task id={task.id} task={task.task} />;
        })}
      </div>
    );
  }
}

export default connect()(TaskGroup);
