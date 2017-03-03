import React, {Component} from 'react';

export default class Map extends Component {

  get cells() {
    const cells = this.props.map.map((row, rowIdx) => {
      return this.renderRow(row, rowIdx)
    });
    return cells;
  }

  renderRow(row, rowIdx) {
    return row.map((cell, colIdx) => this.renderCell(rowIdx, colIdx, cell));
  }

  renderCell(rowIdx, colIdx, cell) {
    const colorMap = {
      '0': '#0000FF',
      '1': '#000000',
      '2': '#FFFFAA',
      '5': '#FFFFFF'
    };
    const key = `${colIdx}-${rowIdx}`;
    const color = colorMap[cell.toString()];
    return (<rect key={key} x={colIdx * 10} y={rowIdx * 10} width="10" height="10" fill={color}/>);
  }

  render() {
    return (
      <g>
        {this.cells}
      </g>
    )
  }
}
