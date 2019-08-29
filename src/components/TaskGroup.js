import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { deleteTaskGroup } from "../actions/boardActions";

class TaskGroup extends Component {
  render() {
    const { id, name, task, deleteTaskGroup } = this.props;
    return (
      <div>
        <div className="card mt-5 mb-5">
          <div
            className="card-header d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "#BAC1DD" }}
          >
            <h5 style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}>
              {name}
            </h5>
            <button
              type="button"
              className="close"
              onClick={deleteTaskGroup.bind(this, id)}
            >
              <span>&times;</span>
            </button>
          </div>
          <ul className="list-group list-group-flush">
            <CreateTask taskGroupID={id} />
            {false ? (
              <li className="list-group-item">
                There is no task for this task group.
              </li>
            ) : (
              task.tasks.map(task => {
                if (id === task.taskGroupID) {
                  return (
                    <Task
                      key={task.taskID}
                      task={task.task}
                      assignedBy={task.assignedBy}
                      submissionID={task.submissionID}
                      taskID={task.taskID}
                      isDone={task.isDone}
                      assignee={task.assignee}
                      dueDate={task.dueDate}
                    />
                  );
                }
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteTaskGroup: deleteTaskGroup
};

const mapStateToProps = ({ task }) => {
  return {
    task
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskGroup);
