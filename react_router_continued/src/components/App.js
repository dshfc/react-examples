import React, {Component} from 'react'
import { Router, Route, hashHistory, browserHistory, Link, IndexRoute } from 'react-router'

class Parent extends Component{
        constructor(props){
            super(props)
            this.state = {
                person: "instructor"
            }
        }
        render(){
            return (
                <div>Hello From the parent!!
                    <br/>
                    <Link to='/childone'>Child One</Link>
                    <br/>
                    <Link to='/childtwo'>Child Two</Link>
                    <br/>
                    <Link to='/childthree'>Child Three</Link>
                    <br/>
                    <Link to='/childone/grandchild'>GrandChild</Link>
                {this.props.children}
                </div>
            )
        }
}

const ChildOne = (props) => <div>I am Child One! {props.children}</div>


const ChildThree = () => <div>I am Child Three!</div>

const ChildTwo = (props) => <div>I am Child Two! </div>
const GrandChild = () => <div>I am a grandchild!</div>


const NotFound = () => (<h1>Nothing to see here! Go <Link to={`/`}>Home</Link></h1>)

export default class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
          <Route path='/' component={Parent}>
            <Route path='childone' component={ChildOne} >
              <Route path='grandchild' component={GrandChild} />
            </Route>
            <Route path='childtwo' component={ChildTwo} />
            <Route path='childthree' component={ChildThree} />
          </Route>
          <Route path='*' component={NotFound} />
      </Router>
    )
  }
}