import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { getTeamDetails } from "../actions/teamActions";
class TeamInfo extends Component {
  state = {
    isOpen: false,
    isLoaded: false
  };

  // componentDidMount() {
  //   const { teamID, getTeamDetails } = this.props;
  //   getTeamDetails(teamID).then(response => {
  //     this.setState({
  //       ...this.state,
  //       isLoaded: true
  //     });
  //   });
  // }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const { teamName } = this.props;
    const { isLoaded } = this.state;
    return (
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#6d7fcc",
          paddingLeft: ".25rem",
          paddingRight: ".50rem"
        }}
      >
        <i className="fas fa-info-circle" onClick={this.toggle}></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{teamName} Information</ModalHeader>
          <ModalBody></ModalBody>
          {!isLoaded ? (
            <div className="text-center">
              <Spinner
                style={{ width: "5rem", height: "5rem", color: "#7386d5" }}
                type="grow"
              />
            </div>
          ) : null}
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getTeamDetails: getTeamDetails
};

export default connect(
  null,
  mapDispatchToProps
)(TeamInfo);
