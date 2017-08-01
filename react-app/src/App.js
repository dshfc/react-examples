/* eslint-disable */

import React, {Component} from 'react';
import PersonList from './PersonList';
import PersonEdit from './PersonEdit';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      people: [
        {firstName: 'Alan', lastName: 'Turing'},
        {firstName: 'Alanzo', lastName: 'Church'},
        {firstName: 'Grace', lastName: 'Hopper'}
      ],
      'add-first-name': '',
      'add-last-name': ''
    };

    this.onDone = this.onDone.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onDone() {
    this.state.editing = null;
    this.setState(this.state);
  }

  onEdit(person) {
    this.state.editing = person;
    this.setState(this.state);
  }

  onAdd(event) {
    event.preventDefault()
    this.state.people = this.state.people.concat([{
      firstName: this.state['add-first-name'],
      lastName: this.state['add-last-name']
    }])
    this.setState(this.state)
  }

  _onChange(event) {
    let newState = this.state
    newState[event.target.name] = event.target.value
    this.setState(newState)
  }

  get childComponent() {
    return this.state.editing ? <PersonEdit person={this.state.editing} onDone={this.onDone} /> : <PersonList people={this.state.people} onEdit={this.onEdit}/>
  }

  render() {
    return (
      <div className="App">
        {this.childComponent}
        <form>
          <input onChange={this._onChange.bind(this)} id="add-first-name" type="text" name="add-first-name"/>
          <input onChange={this._onChange.bind(this)} id="add-last-name" type = "text" name = "add-last-name"/>
          <button onClick={this.onAdd.bind(this)} id="add-person">Add person</button>
        </form>
      </div>
    );
  }
}
