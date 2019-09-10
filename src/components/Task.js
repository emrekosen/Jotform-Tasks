import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import {
  deleteTask,
  toggleDoneTask,
  getAvatar,
  changeTask,
  changeTaskTag
} from "../actions/taskActions";
import moment from "moment";
import { Label, Dropdown, Segment } from "semantic-ui-react";

class Task extends Component {
  state = {
    assigneeAvatar: null,
    task: this.props.task,
    dueDate: this.props.dueDate,
    tag: this.props.tag,
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

  render() {
    const {
      board,
      taskID,
      assignedBy,
      assignee,
      user,
      submissionID,
      isDone,
      deleteTask,
      toggleDoneTask,
      changeTask
    } = this.props;
    const { task, dueDate, tag, mobileDetail } = this.state;
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
              <Label size="large" image>
                <img src={this.state.assigneeAvatar} />
                {assignee}
              </Label>
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
              <Dropdown
                trigger={tagDropdown}
                pointing="top"
                direction="left"
                icon={null}
                options={tags}
                onChange={this.handleTag}
              />
              <Dropdown>
                <Dropdown.Menu className="left">
                  <Dropdown.Item
                    icon="trash"
                    text="Delete task"
                    onClick={deleteTask.bind(this, submissionID)}
                  />
                  <Dropdown.Item icon="exchange" text="Move task" />
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
      // <div key={taskID}>
      //   <li className="list-group-item d-flex justify-content-between align-items-center">
      //     <div className="d-flex align-items-center done-task-group">
      //       {isDone ? (
      //         <i
      //           className="fas fa-check-circle fa-lg"
      //           id="doneIconSDone"
      //           onClick={toggleDoneTask.bind(this, taskID)}
      //         ></i>
      //       ) : (
      //         <i
      //           className="fas fa-check-circle fa-lg"
      //           id="doneIconS"
      //           onClick={toggleDoneTask.bind(this, taskID)}
      //         ></i>
      //       )}
      //       <input
      //         className="task"
      //         defaultValue={task}
      //         onChange={this.handleChange}
      //         onBlur={this.changeTaskHandler.bind(this, dueDate)}
      //       />
      //     </div>
      //     {/* TASK DETAIL */}
      //     <div id="task-detail" className="align-items-center">
      //       <DatePicker
      //         className={
      //           dateDiff < 0
      //             ? "date-picker date-picker-red"
      //             : "date-picker date-picker-green"
      //         }
      //         selected={moment(dueDate).toDate()}
      //         onChange={this.handleDueDate}
      //         minDate={new Date()}
      //         dateFormat="MMMM d"
      //       />
      //       <Label size="large" image>
      //         <img src={this.state.assigneeAvatar} />
      //         {assignee}
      //       </Label>

      //       <Dropdown>
      //         <Dropdown.Menu className="left">
      //           <Dropdown.Item
      //             icon="trash"
      //             text="Delete task"
      //             onClick={deleteTask.bind(this, submissionID)}
      //           />
      //           <Dropdown.Item icon="exchange" text="Move task" />
      //         </Dropdown.Menu>
      //       </Dropdown>
      //     </div>
      //     <div id="mobile-detail" className="align-items-center">
      //       <button
      //         type="button"
      //         id="dropdown-menu-button"
      //         onClick={() => {
      //           this.setState({
      //             ...this.state,
      //             mobileDetail: !this.state.mobileDetail
      //           });
      //         }}
      //       ></button>
      //     </div>
      //   </li>
      //   {/* MOBILE DETAIL PART */}
      //   <li
      //     id="mobile-detail-li"
      //     className="list-group-item align-items-center justify-content-between "
      //     style={{
      //       display: mobileDetail ? "flex" : "none"
      //     }}
      //   >
      //     <div>
      //       <DatePicker
      //         className={
      //           dateDiff < 0
      //             ? "date-picker date-picker-red"
      //             : "date-picker date-picker-green"
      //         }
      //         selected={moment(dueDate).toDate()}
      //         onChange={this.handleDueDate}
      //         minDate={new Date()}
      //         dateFormat="MMMM d"
      //       />

      //       <img
      //         className="ml-2"
      //         id="mobile-assignee-avatar"
      //         src={this.state.assigneeAvatar}
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       {true ? (
      //         <button
      //           className="btn btn-primary mr-2"
      //           onClick={deleteTask.bind(this, submissionID)}
      //         >
      //           <i className="fas fa-trash-alt"></i>
      //         </button>
      //       ) : null}
      //       <button className="btn btn-primary">
      //         <i className="fas fa-exchange-alt"></i>
      //       </button>
      //     </div>
      //   </li>
      // </div>
    );
  }
}

const mapStateToProps = ({ user, board }) => {
  return {
    user,
    board
  };
};

const mapDispatchToProps = {
  deleteTask: deleteTask,
  toggleDoneTask: toggleDoneTask,
  getAvatar: getAvatar,
  changeTask: changeTask,
  changeTaskTag: changeTaskTag
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
