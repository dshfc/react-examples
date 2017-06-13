import React from 'react'
import ReactDOM from 'react-dom'
import Cell from './Cell'
import { mount } from 'enzyme'

test('Cell calls the startEditing function when double-clicked', () => {
  const div = document.createElement('div')
  const cellStartedEditing = jest.fn()
  const cellWasUpdated = jest.fn()
  const wrapper = mount(
    <Cell
      data={ {} }
      rowNumber={12}
      columnNumber={14}
      cellStartedEditing={cellStartedEditing}
      cellWasUpdated={cellWasUpdated} />
  )

  wrapper.find('div.cell').simulate('doubleClick')

  expect(cellStartedEditing).toHaveBeenCalledWith(12, 14, {})
  expect(cellWasUpdated).not.toHaveBeenCalled()
})
