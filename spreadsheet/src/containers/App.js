import React, { Component } from 'react'
import './App.css'
import Row from '../components/Row'

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
    return Array.from(new Array(30), () => {
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
        <div key="select-all" className="row-header"></div>
      ].concat(cells)
  }

  cellStartedEditing(row, column) {
    const object = this.state.data[row][column]

    if (this.state.editing) {
      const cell = this.state.data[this.state.editing.row][this.state.editing.column]
      cell.editing = false
    }
    object.editing = true
    this.setState({
      editing: { row, column },
      data: this.state.data
    })
  }

  cellWasUpdated(row, column, value) {
    const object = this.state.data[row][column]
    object.value = value
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

export default App
