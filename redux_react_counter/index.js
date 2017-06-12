import React from 'react'
import ReactDOM from 'react-dom'
import store from './reducers/counter_reducer'
import Counter from './components/App'
import {Provider} from 'react-redux'


ReactDOM.render(
    <Provider store={store}>
      <Counter/>
    </Provider>
    ,document.getElementById('container'))

