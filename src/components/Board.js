import React, { Component } from 'react'

export default class Board extends Component {

  render() {
    return (
      <div>
        {this.props.match.params.teamName} -- {this.props.match.params.boardID}
      </div>
    )
  }
}
