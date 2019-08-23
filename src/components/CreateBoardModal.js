import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import history from "../utils/history";
import { createBoard } from "../actions/boardActions";

class CreateBoardModal extends Component {
  // componentDidMount() {
  //   const { getAllTeams } = this.props;
  // }

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      modal: false,
      isLoaded: false,
      createBoardName: ""
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onClickCreateBoard = e => {
    const { createBoardName } = this.state;
    const { createBoard, team } = this.props;
    createBoard(createBoardName).then(newBoardID => {
      this.setState({
        ...this.state,
        createBoardName: "",
        modal: false
      });
      history.push(`/${team.teamID}/${newBoardID}`);
    });
  };

  render() {
    const { createBoardName } = this.state;
    return (
      <div>
        <a href="#" onClick={this.toggle}>
          <i className="fas fa-user-plus" />
          {this.props.buttonLabel}
        </a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create a Board</ModalHeader>

          <ModalBody>
            <InputGroup>
              <Input
                placeholder="Board Name"
                name="createBoardName"
                onChange={this.handleChange}
                value={createBoardName}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={this.onClickCreateBoard}>
                  Create
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user, team }) => {
  return {
    user,
    team
  };
};

const mapDispatchToProps = {
  createBoard: createBoard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBoardModal);
