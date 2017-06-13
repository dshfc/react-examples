import React from 'react'
import Cell from './Cell'

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

export default Row
