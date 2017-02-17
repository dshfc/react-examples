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
      ]
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

  get childComponent() {
    return this.state.editing
      ? <PersonEdit person={this.state.editing} onDone={this.onDone} />
      : <PersonList people={this.state.people} onEdit={this.onEdit}/>
  }

  render() {
    return (
      <div className="App">
        {this.childComponent}
      </div>
    );
  }
}
