import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { getAllTeams, createTeam } from "../actions/teamActions";
import { joinTeam } from "../actions/userActions";
import history from "../utils/history";

class JoinTeamModal extends Component {
  // componentDidMount() {
  //   const { getAllTeams } = this.props;
  // }

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      modal: false,
      isLoaded: false,
      createTeamName: ""
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

  onClickCreateTeam = e => {
    const { createTeamName } = this.state;
    const { createTeam } = this.props;
    createTeam(createTeamName).then(newTeamID => {
      this.setState({
        ...this.state,
        createTeamName: "",
        modal: false
      });
      history.push(`/${newTeamID}/boards`);
    });
  };

  render() {
    const { modal, isLoaded, teams, createTeamName } = this.state;
    const { getAllTeams, joinTeam, user } = this.props;

    if (modal && !isLoaded) {
      getAllTeams().then(allTeams => {
        this.setState({
          ...this.state,
          isLoaded: true,
          teams: allTeams
        });
      });
    }
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
          <ModalHeader toggle={this.toggle}>Join/Create a Team</ModalHeader>

          <ModalBody>
            <h5 style={{ marginBottom: ".5rem" }}>Create Team</h5>
            <InputGroup
              style={{
                marginBottom: "5%"
              }}
            >
              <Input
                className="input-box"
                placeholder="Team Name"
                name="createTeamName"
                onChange={this.handleChange}
                value={createTeamName}
              />
              <InputGroupAddon addonType="append">
                <Button
                  color="primary"
                  id="modalCreateButton"
                  onClick={this.onClickCreateTeam}
                >
                  Create
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <h5>Join Team</h5>
            <p id="select-team">Select team to join</p>
            {!isLoaded ? (
              <div className="text-center">
                <Spinner
                  style={{ width: "3rem", height: "3rem", color: "#7386d5" }}
                  type="grow"
                />
              </div>
            ) : (
              <ListGroup>
                {teams.map(team => {
                  if (
                    user.teams.some(userTeam => userTeam.teamID === team.teamID)
                  ) {
                    return (
                      <ListGroupItem
                        disabled
                        onClick={joinTeam.bind(this, {
                          teamID: team.teamID,
                          teamName: team.teamName
                        })}
                        key={team.teamID}
                      >
                        {team.teamName}
                      </ListGroupItem>
                    );
                  }
                  return (
                    <ListGroupItem
                      onClick={joinTeam.bind(this, {
                        teamID: team.teamID,
                        teamName: team.teamName
                      })}
                      key={team.teamID}
                    >
                      {team.teamName}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = {
  getAllTeams: getAllTeams,
  joinTeam: joinTeam,
  createTeam: createTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinTeamModal);
