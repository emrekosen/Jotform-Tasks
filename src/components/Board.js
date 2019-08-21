import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard } from "../actions/boardActions";
class Board extends Component {
  componentDidUpdate(prevProps) {
    const { getBoard, match } = this.props;
    if (prevProps.match.params.boardID !== match.params.boardID) {
      getBoard(match.params.boardID);
    }
  }

  componentDidMount() {
    const { getBoard, match } = this.props;
    getBoard(match.params.boardID);
  }

  render() {
    const { board } = this.props;
    return <div>{board.boardName}</div>;
  }
}

const mapDispatchToProps = {
  getBoard: getBoard
};

const mapStateToProps = ({ user, team, board }) => {
  return {
    user,
    team,
    board
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
