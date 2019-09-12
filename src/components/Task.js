import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import {
  deleteTask,
  toggleDoneTask,
  getAvatar,
  changeTask,
  changeTaskTag,
  moveTask,
  changeAssignee
} from "../actions/taskActions";
import moment from "moment";
import { Label, Dropdown, Segment, Popup } from "semantic-ui-react";

class Task extends Component {
  state = {
    assigneeAvatar: null,
    task: this.props.task,
    dueDate: this.props.dueDate,
    tag: this.props.tag,
    assignee: this.props.assignee,
    mobileDetail: false
  };

  componentDidMount() {
    const { getAvatar, assignee } = this.props;
    getAvatar(assignee).then(avatarUrl => {
      this.setState({
        assigneeAvatar: avatarUrl
      });
    });
  }

  changeTaskHandler = dueDate => {
    const { changeTask, taskID } = this.props;
    changeTask({
      taskID,
      newTask: this.state.task,
      newDueDate: dueDate
    });
  };

  changeTagHandler = data => {
    const { changeTaskTag, taskID } = this.props;
    changeTaskTag({ taskID, tag: data });
  };

  changeAssigneeHandler = value => {
    const { changeAssignee, taskID } = this.props;
    changeAssignee({ taskID, newAssignee: value });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      task: e.target.value
    });
  };

  handleDueDate = date => {
    this.setState({
      ...this.state,
      dueDate: date
    });
    this.changeTaskHandler(date);
  };

  handleTag = (e, { value }) => {
    const values = value.split("-");
    this.setState({
      ...this.state,
      tag: { name: values[0], color: values[1] }
    });
    this.changeTagHandler({ name: values[0], color: values[1] });
  };

  handleAssignee = (e, { value }) => {
    const values = value.split(" ");
    console.log(values);
    this.setState({
      ...this.state,
      assignee: values[0],
      assigneeAvatar: values[1]
    });
    this.changeAssigneeHandler(values[0]);
  };

  render() {
    const {
      board,
      taskID,
      assignedBy,
      user,
      team,
      submissionID,
      isDone,
      deleteTask,
      toggleDoneTask,
      changeTask,
      moveTask
    } = this.props;
    const { task, dueDate, tag, mobileDetail, assignee } = this.state;
    const dateDiff =
      moment(moment(dueDate).format("L")).valueOf() -
      moment(moment().format("L")).valueOf();
    const tagDropdown = (
      <div className={"ui " + tag.color + " large label"}> {tag.name}</div>
    );
    const tags = board.tags.map(tag => {
      return {
        key: tag.color,
        text: tag.name,
        value: tag.name + "-" + tag.color,
        label: { color: tag.color, empty: true, circular: true }
      };
    });

    const users = team.users.map(user => {
      return {
        key: user.email,
        text: user.username,
        value: user.username + " " + user.avatarUrl,
        image: { avatar: true, src: user.avatarUrl }
      };
    });
    return (
      <Segment>
        <div key={taskID}>
          <li className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center done-task-group">
              {isDone ? (
                <i
                  className="fas fa-check-circle fa-lg"
                  id="doneIconSDone"
                  onClick={toggleDoneTask.bind(this, taskID)}
                ></i>
              ) : (
                <i
                  className="fas fa-check-circle fa-lg"
                  id="doneIconS"
                  onClick={toggleDoneTask.bind(this, taskID)}
                ></i>
              )}
              <input
                className="task"
                defaultValue={task}
                onChange={this.handleChange}
                onBlur={this.changeTaskHandler.bind(this, dueDate)}
              />
            </div>
            {/* TASK DETAIL */}
            <div id="task-detail" className="align-items-center">
              <div
                style={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: ".50rem"
                }}
              >
                <Dropdown
                  trigger={tagDropdown}
                  pointing="top"
                  direction="left"
                  icon={null}
                  options={tags}
                  onChange={this.handleTag}
                />
                <Dropdown
                  trigger={
                    <Label size="large" image>
                      <img src={this.state.assigneeAvatar} />
                      {assignee}
                    </Label>
                  }
                  pointing="top"
                  direction="left"
                  icon={null}
                  options={users}
                  onChange={this.handleAssignee}
                />
              </div>
              <DatePicker
                className={
                  dateDiff < 0
                    ? "date-picker date-picker-red"
                    : "date-picker date-picker-green"
                }
                selected={moment(dueDate).toDate()}
                onChange={this.handleDueDate}
                minDate={new Date()}
                dateFormat="MMMM d"
              />
              <Dropdown>
                <Dropdown.Menu className="left">
                  <Dropdown.Item
                    icon="trash"
                    text="Delete task"
                    onClick={deleteTask.bind(this, submissionID)}
                  />
                  <Popup
                    trigger={<Dropdown.Item icon="exchange" text="Move task" />}
                    position="left center"
                    flowing
                    hoverable
                  >
                    {board.taskGroups.map(taskGroup => {
                      return (
                        <div
                          key={taskGroup.taskGroupID}
                          onClick={moveTask.bind(this, {
                            taskGroupID: taskGroup.taskGroupID,
                            taskID: taskID
                          })}
                          style={{
                            fontSize: "16px",
                            cursor: "default",
                            color: "black",
                            marginTop: ".75rem",
                            marginBottom: ".75rem"
                          }}
                        >
                          <Label
                            style={{ marginRight: ".25rem" }}
                            circular
                            color={taskGroup.color}
                            empty
                            key={taskGroup.color}
                          />
                          {taskGroup.taskGroupName}
                        </div>
                      );
                    })}
                  </Popup>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div id="mobile-detail" className="align-items-center">
              <button
                type="button"
                id="dropdown-menu-button"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    mobileDetail: !this.state.mobileDetail
                  });
                }}
              ></button>
            </div>
          </li>
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = ({ user, board, team }) => {
  return {
    user,
    board,
    team
  };
};

const mapDispatchToProps = {
  deleteTask: deleteTask,
  toggleDoneTask: toggleDoneTask,
  getAvatar: getAvatar,
  changeTask: changeTask,
  changeTaskTag: changeTaskTag,
  moveTask: moveTask,
  changeAssignee: changeAssignee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
