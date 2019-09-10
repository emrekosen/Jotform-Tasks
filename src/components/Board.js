import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard, deleteBoard, createTag } from "../actions/boardActions";
import { getTasks } from "../actions/taskActions";
import CreateTaskGroup from "./CreateTaskGroup";
import TaskGroup from "./TaskGroup";
import history from "../utils/history";
import { getTeam } from "../actions/teamActions";
import { getUserTeams } from "../actions/userActions";
import Container from "./Container";
import {
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Dropdown, Form, Button } from "semantic-ui-react";

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

const settingsTrigger = (
  <button className="btn btn-primary ml-2">
    <i className="fas fa-cog"></i>
  </button>
);

class Board extends Component {
  state = {
    isLoading: true,
    isAdding: false,
    modal: false,
    color: "",
    tag: ""
  };

  toggleModal = () =>
    this.setState({
      ...this.state,
      modal: !this.state.modal
    });

  handleTag = e => {
    this.setState({
      ...this.state,
      tag: e.target.value
    });
  };

  handleColor = (e, { value }) => {
    this.setState({
      ...this.state,
      color: value
    });
  };

  componentDidUpdate(prevProps) {
    const { match, getBoard, getTasks } = this.props;
    if (prevProps.match.params.boardID !== match.params.boardID) {
      getBoard(match.params.boardID).then(response => {
        const { board } = this.props;
        getTasks(board.taskGroups);
      });
    }
  }

  componentDidMount() {
    const {
      getBoard,
      getTasks,
      getTeam,
      getUserTeams,
      match,
      user
    } = this.props;
    if (!user.isLoaded) {
      getTeam(match.params.teamID).then(() => {
        getUserTeams().then(() => {
          getBoard(match.params.boardID).then(response => {
            const { board } = this.props;
            getTasks(board.taskGroups).then(() => {
              this.setState({
                isLoading: false
              });
            });
          });
        });
      });
    } else {
      getBoard(match.params.boardID).then(response => {
        const { board } = this.props;
        getTasks(board.taskGroups).then(() => {
          this.setState({
            isLoading: false
          });
        });
      });
    }
  }

  toggleTaskGroupAddBar = () => {
    this.setState({
      ...this.state,
      isAdding: !this.state.isAdding
    });
  };

  onDeleteBoard = e => {
    const { board, team, deleteBoard } = this.props;
    deleteBoard(board.boardID).then(() => {
      history.push(`/teams`);
    });
  };

  onCreateTag = e => {
    const { createTag } = this.props;
    const { tag, color } = this.state;
    createTag({ name: tag, color: color }).then(response => {
      this.setState({
        ...this.state,
        modal: false,
        color: "",
        tag: ""
      });
    });
  };
  render() {
    const { board } = this.props;
    const { isLoading, isAdding } = this.state;
    const colorsList = colors.map(color => {
      return {
        key: color,
        text: color.charAt(0).toUpperCase() + color.slice(1),
        value: color,
        label: { color: color, empty: true, circular: true }
      };
    });
    if (isLoading) {
      return (
        <Container>
          <div className="text-center">
            <Spinner
              style={{ width: "5rem", height: "5rem", color: "#7386d5" }}
              type="grow"
            />
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <div>
          <div className="d-flex justify-content-end align-items-end">
            <CreateTaskGroup />
            <Dropdown
              trigger={settingsTrigger}
              pointing="top"
              direction="left"
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Create a new tag"
                  icon="tag"
                  onClick={this.toggleModal}
                />
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                    Create a Tag
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <Form.Group widths="equal">
                        <Form.Input
                          placeholder="Tag name"
                          value={this.state.tag}
                          onChange={this.handleTag}
                        ></Form.Input>
                        <Form.Select
                          placeholder="Select a color"
                          fluid
                          onChange={this.handleColor}
                          selection
                          options={colorsList}
                        ></Form.Select>
                      </Form.Group>
                      <Button onClick={this.onCreateTag}>Create Tag</Button>
                    </Form>
                  </ModalBody>
                </Modal>
                <Dropdown.Item
                  text="Delete board"
                  icon="trash"
                  onClick={this.onDeleteBoard}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {board.taskGroups.length === 0 ? (
            <div className="text-center mt-5">
              <h4>
                There is no task group for this board. You can create with
                "Create Task Group" button.
              </h4>
            </div>
          ) : (
            board.taskGroups.map(taskGroup => {
              return (
                <TaskGroup
                  key={taskGroup.taskGroupID}
                  name={taskGroup.taskGroupName}
                  id={taskGroup.taskGroupID}
                  color={taskGroup.color}
                />
              );
            })
          )}
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getBoard: getBoard,
  getTasks: getTasks,
  deleteBoard: deleteBoard,
  getTeam: getTeam,
  getUserTeams: getUserTeams,
  createTag: createTag
};

const mapStateToProps = ({ user, board }) => {
  return {
    user,
    board
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
