import React, {Component} from 'react';
import Wall from './Wall.js';
import Floor from './Floor.js';
import Pellet from './Pellet.js';
import PowerUp from './PowerUp.js';

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

    const key = `${colIdx}-${rowIdx}`;
    switch (cell) {
      case 0: return <Wall key={key} x={colIdx * 10} y={rowIdx * 10} />;
      case 1: return <Pellet key={key} x={colIdx * 10} y={rowIdx * 10} />;
      case 2: return <Floor key={key} x={colIdx * 10} y={rowIdx * 10} />;
      case 3: return <Floor key={key} x={colIdx * 10} y={rowIdx * 10} />;
      case 4: return <PowerUp key={key} x={colIdx * 10} y={rowIdx * 10} time={this.props.time} />;
      default: return <g />
    }
  }

  render() {
    return (
      <g>
        {this.cells}
      </g>
    )
  }
}
