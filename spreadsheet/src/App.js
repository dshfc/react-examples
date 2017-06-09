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
      }).reduce((rowData, row, i) => {
        rowData.set(
          i,
          row.reduce((cellData, cell, j) => {
            cellData.set(j, cell)
            return cellData
          }, new Map())
        )
        return rowData
      }, new Map())
  }

  headerRow() {
    const cells = []
    this.state.data.get(0).forEach((_, columnNumber) => {
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
    const rows = []
    this.state.data.forEach((row, i) => {
      rows.push(
        <Row  key={`row-${i}`}
              rowNumber={i}
              row={i}
              data={row}
              cellStartedEditing={this.cellStartedEditing}
              cellWasUpdated={this.cellWasUpdated} />
      )
    })
    return rows
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

class Row extends Component {

  cells() {
    const cells = []
    this.props.data.forEach((cell, i) => {
      cells.push(
        <Cell key={`cell-${this.props.row}-${i}`}
              data={cell}
              rowNumber={this.props.rowNumber}
              columnNumber={i}
              cellStartedEditing={this.props.cellStartedEditing}
              cellWasUpdated={this.props.cellWasUpdated} />
      )
    })
    return cells
  }

  render() {
    return (
      <div className="row">
        <div className="cell row-header">
          {this.props.rowNumber}
        </div>
        {this.cells()}
      </div>
    )
  }

}

class Cell extends Component {
  constructor() {
    super()
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onDoubleClick() {
    this.props.cellStartedEditing(
      this.props.rowNumber,
      this.props.columnNumber,
      this.props.data
    )
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.cellWasUpdated(
        this.props.rowNumber,
        this.props.columnNumber,
        this.props.data
      )
    }
  }

  componentDidUpdate(){
    console.log(`updating cell`);
    if (this.props.data.editing) {
      this.input.focus()
    }
  }

  render() {
    if (this.props.data.editing) {
      return (
        <div  className="cell editing"
              onDoubleClick={this.onDoubleClick}>
          <input  className="cell"
                  defaultValue={this.props.data.value}
                  onChange={(e) => this.props.data.value = e.target.value}
                  onKeyPress={this.onKeyPress}
                  ref={(input) => { this.input = input }} />
        </div>
      )
    } else {
      return (
        <div  className="cell"
              onDoubleClick={this.onDoubleClick}>
          {this.props.data.value}
        </div>
      )
    }
  }
}

export default App
