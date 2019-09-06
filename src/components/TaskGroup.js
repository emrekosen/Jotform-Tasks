import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { deleteTaskGroup } from "../actions/boardActions";
import { Segment, Header } from "semantic-ui-react";

class TaskGroup extends Component {
  render() {
    const { id, name, task, deleteTaskGroup } = this.props;
    return (
      <Segment.Group>
        <Segment attached="top" color="purple" inverted>
          <h4>{name}</h4>
        </Segment>
        <CreateTask taskGroupID={id} />
        {task.tasks.map(task => {
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
