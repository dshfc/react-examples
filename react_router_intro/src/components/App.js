import React, {Component} from 'react'
import { Router, Route, hashHistory, browserHistory, Link } from 'react-router'

const First = () => <div>Hello World! <Link to={`/awesome`}>Home</Link></div>
const Second = () => <div>Hello World!</div>
const NotFound = () => (<h1>Nothing to see here! Go <Link to={`/`}>Home</Link></h1>)

export default class App extends Component {
    render(){
        return (
              <Router history={browserHistory}>
                <Route path='/' component={First} />
                <Route path='/second' component={Second} />
                <Route path='*' component={NotFound} />
              </Router>
            )
    }
}