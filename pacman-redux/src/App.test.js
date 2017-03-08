import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { mount, shallow } from 'enzyme'
import configureStore from './configureStore'

it('renders without crashing', () => {
  const state = {
    pacman: {
      pos: [130, 200],
      vel: [0, 0],
      dying: 0,
      power: 0
    },
    ghosts: [
    
    ],
    map: [
      [0],
      [0]
    ]
  }
  const mockStore = configureStore(state)
  const div = document.createElement('div')
  ReactDOM.render(<Provider store={mockStore}><App /></Provider>, div)
})

it('App should contain an svg element', () => {
  const state = {
    pacman: {
      pos: [130, 200],
      vel: [0, 0],
      dying: 0,
      power: 0
    },
    ghosts: [
      
    ],
    map: [
      [0],
      [0]
    ]
  }
  const mockStore = configureStore(state)
  const wrapper = mount(<Provider store={mockStore}><App /></Provider>)
  expect(wrapper.find('svg').length).toBe(1)
})
