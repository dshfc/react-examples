import React from 'react'

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

export default Cell
