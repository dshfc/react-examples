import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.cellStartedEditing = this.cellStartedEditing.bind(this)
    this.cellWasUpdated = this.cellWasUpdated.bind(this)
    this.state = {
      data: this.emptySpreadsheet(),
      editing: null,
    }
  }

  emptySpreadsheet() {
    return Array.from(new Array(16), () => {
      return Array.from(new Array(26), () => ({}))
    })
  }

  headerRow() {
    const cells = []
    this.state.data[0].forEach((_, columnNumber) => {
      cells.push(
        <div key={`header=${`header-${columnNumber}`}`} className="cell column-header">
          {columnNumber}
        </div>
      )
    })

    return [
        <div key="select-all" className="cell select-all"></div>
      ].concat(cells)
  }

  cellStartedEditing(row, column, object) {
    if (this.state.editing) {
      const cell = this.state.editing
      cell.editing = false
    }
    object.editing = true
    this.setState({
      editing: object,
      data: this.state.data
    })
  }

  cellWasUpdated(row, column, object) {
    object.editing = false
    this.setState({
      editing: null,
      data: this.state.data
    })
  }

  rows() {
    return this.state.data.map((row, i) => {
      return (
        <Row  key={`row-${i}`}
              rowNumber={i}
              row={i}
              data={row}
              cellStartedEditing={this.cellStartedEditing}
              cellWasUpdated={this.cellWasUpdated} />
      )
    })
  }

  render() {
    return (
      <div className="spreadsheet">
        {this.headerRow()}
        {this.rows()}
      </div>
    );
  }
}

function Row({
  row,
  data,
  cellStartedEditing,
  cellWasUpdated,
  rowNumber,
}) {

  const cells = data.map((cell, i) => {
    return (
      <Cell key={`cell-${row}-${i}`}
            data={cell}
            rowNumber={rowNumber}
            columnNumber={i}
            cellStartedEditing={cellStartedEditing}
            cellWasUpdated={cellWasUpdated} />
    )
  })

  return (
    <div className="row">
      <div className="cell row-header">
        {rowNumber}
      </div>
      {cells}
    </div>
  )

}

function Cell({
  cellStartedEditing,
  cellWasUpdated,
  rowNumber,
  columnNumber,
  data
}) {

  const onDoubleClick = () => {
    cellStartedEditing( rowNumber, columnNumber, data )
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      cellWasUpdated( rowNumber, columnNumber, data )
    }
  }

  if (data.editing) {
    return (
      <div  className="cell editing" onDoubleClick={onDoubleClick}>
        <input  className="cell"
                autoFocus
                defaultValue={data.value}
                onChange={(e) => data.value = e.target.value}
                onKeyPress={onKeyPress} />
      </div>
    )
  } else {
    return (
      <div  className="cell" onDoubleClick={onDoubleClick}>
        {data.value}
      </div>
    )
  }

}

export default App
