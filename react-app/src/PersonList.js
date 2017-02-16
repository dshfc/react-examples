import React, {Component} from 'react';

export default class PersonList extends Component {

  get people() {
    return this.props.people.map((person, i) => (
      <li key={i}>
        {person.firstName} {person.lastName}
        &nbsp; <a href="javascript:void(0)" onClick={() => this.props.onEdit(person)}>edit</a>
      </li>
    ))
  }

  render() {
    return (
      <ul>
        {this.people}
      </ul>
    );
  }
}
