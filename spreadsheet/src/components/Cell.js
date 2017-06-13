import React from 'react'

class Cell extends React.Component {

  constructor(props) {
    super(props)
    this.state = { value: props.value }
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onDoubleClick() {
    this.props.cellStartedEditing(
      this.props.rowNumber,
      this.props.columnNumber,
    )
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.cellWasUpdated(
        this.props.rowNumber,
        this.props.columnNumber,
        this.state.value,
      )
    }
  }

  render() {
    console.log(`Rendering Cell`)
    const data = this.props.data

    if (data.editing) {
      return (
        <div  className="cell editing" onDoubleClick={this.onDoubleClick}>
          <input  className="cell"
                  autoFocus
                  defaultValue={data.value}
                  onChange={(e) => this.setState({value: e.target.value}) }
                  onKeyPress={this.onKeyPress} />
        </div>
      )
    } else {
      return (
        <div  className="cell" onDoubleClick={this.onDoubleClick}>
          {data.value}
        </div>
      )
    }
  }

}

export default Cell
