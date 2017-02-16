import React, {Component} from 'react';
import PersonList from './PersonList'
import PersonEdit from './PersonEdit'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      people: [
        {
          firstName: 'Alan',
          lastName: 'Turing'
        },
        {
          firstName: 'Alanzo',
          lastName: 'Church'
        },
        {
          firstName: 'Brent',
          lastName: 'Gardner'
        },
      ]
    };

    this.onEdit = this.onEdit.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  onEdit(person) {
    this.state.editing = person;
    this.setState(this.state);
  }

  onDone() {
    this.state.editing = null;
    this.setState(this.state);
  }

  get childComponent() {
    return this.state.editing
      ? <PersonEdit person={this.state.editing} onDone={this.onDone} />
      : <PersonList people={this.state.people} onEdit={this.onEdit} />
  }

  render() {
    return (
      <div className="App">
        {this.childComponent}
      </div>
    );
  }
}
