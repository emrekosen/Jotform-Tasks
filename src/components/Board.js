import React, { Component } from "react";

export default class Board extends Component {
  componentDidMount() {
    //get board
  }

  render() {
    return (
      <div>
        {this.props.match.params.teamName} -- {this.props.match.params.boardID}
      </div>
    );
  }
}
