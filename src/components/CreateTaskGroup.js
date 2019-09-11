import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Form } from "semantic-ui-react";
import { addTaskGroup } from "../actions/taskActions";

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black"
];

const colorsList = colors.map(color => {
  return {
    key: color,
    text: color.charAt(0).toUpperCase() + color.slice(1),
    value: color,
    label: { color: color, empty: true, circular: true }
  };
});

class CreateTaskGroup extends Component {
  state = {
    taskGroupName: "",
    color: "",
    modal: false
  };

  toggleModal = () =>
    this.setState({
      ...this.state,
      modal: !this.state.modal
    });

  handleName = e => {
    this.setState({
      ...this.state,
      taskGroupName: e.target.value
    });
  };

  handleColor = (e, { value }) => {
    this.setState({
      ...this.state,
      color: value
    });
  };

  addTask = () => {
    const { addTaskGroup, toggleBar } = this.props;
    const { taskGroupName, color } = this.state;
    addTaskGroup({ newTaskGroupName: taskGroupName, color }).then(() => {
      this.setState({
        taskGroupName: "",
        color: ""
      });
      this.toggleModal();
    });
  };

  render() {
    return (
      <div>
        <button
          id="addTaskGroup"
          className="btn btn-primary"
          onClick={this.toggleModal}
        >
          Create Task Group
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Create New Task Group
          </ModalHeader>
          <ModalBody>
            <Form>
              <Form.Input
                placeholder="Task group name"
                value={this.state.taskGroupName}
                onChange={this.handleName}
              ></Form.Input>
              <Form.Select
                placeholder="Select a color"
                onChange={this.handleColor}
                selection
                options={colorsList}
              ></Form.Select>
              <Button onClick={this.addTask}>Create</Button>
            </Form>
          </ModalBody>
        </Modal>
        {/* // <InputGroup>
      //   <InputGroupAddon addonType="prepend" onClick={toggleBar}>
      //     <Button>&times;</Button>
      //   </InputGroupAddon>
      //   <Input
      //     placeholder="Task group name"
      //     name="taskGroupName"
      //     value={this.state.taskGroupName}
      //     onChange={this.changeHandler}
      //   />
      //   <InputGroupAddon addonType="append">
      //     <Button onClick={this.addTask} color="primary">
      //       Add
      //     </Button>
      //   </InputGroupAddon>
      // </InputGroup> */}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addTaskGroup: addTaskGroup
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTaskGroup);
