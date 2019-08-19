import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeam } from "../actions/teamActions";
import Container from "./Container";

class Boards extends Component {
  componentDidMount() {
    const { getTeam } = this.props;
    getTeam(this.props.match.params.teamID);
  }

  render() {
    return (<Container>
      <h1>Boards</h1>
    </Container>);
  }
}

const mapDispatchToProps = {
  getTeam: getTeam
}

export default connect(null, mapDispatchToProps)(Boards)
