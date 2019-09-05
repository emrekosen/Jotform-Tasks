import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";

class TeamInfo extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const { teamName } = this.props;
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
        </Modal>
      </div>
    );
  }
}

export default TeamInfo;
