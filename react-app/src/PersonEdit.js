import React, {Component} from 'react';

export default class PersonEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: props.person
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  handleInputChange(event) {
    this.state.person[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  onDone() {
    this.props.onDone(this.state.person);
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              <input type="text"
                     name="firstName"
                     defaultValue={this.state.person.firstName}
                     onChange={this.handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <input type="text"
                     name="lastName"
                     defaultValue={this.props.person.lastName}
                     onChange={this.handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={this.onDone}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
