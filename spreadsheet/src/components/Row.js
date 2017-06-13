import React from 'react'
import Cell from './Cell'

class Row extends React.Component {
  render() {
    const cells = this.props.data.map((cell, i) => {
      return (
        <Cell key={`cell-${this.props.row}-${i}`}
              data={cell}
              rowNumber={this.props.rowNumber}
              columnNumber={i}
              cellStartedEditing={this.props.cellStartedEditing}
              cellWasUpdated={this.props.cellWasUpdated} />
      )
    })

    return (
      <div className="row">
        <div className="row-header">
          {this.props.rowNumber}
        </div>
        {cells}
      </div>
    )
  }
}

export default Row
