import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { deleteTaskGroup } from "../actions/boardActions";
import { Segment, Header, Grid, Button, Icon } from "semantic-ui-react";

class TaskGroup extends Component {
  render() {
    const { id, name, task, color, deleteTaskGroup, hideDones } = this.props;
    return (
      <Segment.Group
        style={{
          marginTop: "3rem"
        }}
      >
        <Segment
          attached="top"
          color={color}
          style={{
            cursor: "default"
          }}
          secondary
        >
          <div
            style={{ height: 25 }}
            className="d-flex justify-content-between align-items-center"
          >
            <h4 style={{ marginBottom: 0 }}>{name}</h4>
            <Icon name="close" onClick={deleteTaskGroup.bind(this, id)} />
          </div>
        </Segment>
        <CreateTask taskGroupID={id} />
        {task.tasks.map(task => {
          if (id === task.taskGroupID) {
            if (hideDones) {
              if (!task.isDone) {
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
                    tag={task.tag}
                  />
                );
              } else {
                return null;
              }
            }
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
                tag={task.tag}
              />
            );
          }
        })}
      </Segment.Group>
      // <div className="card task-group">
      //   <div
      //     className="card-header d-flex align-items-center justify-content-between"
      //     style={{ backgroundColor: "#7386d5" }}
      //   >
      //     <h5
      //       style={{
      //         marginTop: "0.25rem",
      //         marginBottom: "0.25rem",
      //         color: "white"
      //       }}
      //     >
      //       {name}
      //     </h5>
      //     <button
      //       type="button"
      //       className="close"
      //       onClick={deleteTaskGroup.bind(this, id)}
      //     >
      //       <span>&times;</span>
      //     </button>
      //   </div>
      //   <ul className="list-group list-group-flush">
      //     <CreateTask taskGroupID={id} />
      //     {task.tasks.map(task => {
      //       if (id === task.taskGroupID) {
      //         return (
      //           <Task
      //             key={task.taskID}
      //             task={task.task}
      //             assignedBy={task.assignedBy}
      //             submissionID={task.submissionID}
      //             taskID={task.taskID}
      //             isDone={task.isDone}
      //             assignee={task.assignee}
      //             dueDate={task.dueDate}
      //           />
      //         );
      //       }
      //     })}
      //   </ul>
      // </div>
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
