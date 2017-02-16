import React, {Component} from 'react';

export default class PersonEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: props.person
    };
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              <input type="text"
                     defaultValue={this.state.person.firstName}
                     onChange={(val) => {
                       this.state.person.firstName = val.target.value;
                       this.setState(this.state);
                     }}
              />
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <input type="text"
                     defaultValue={this.props.person.lastName}
                     onChange={(val) => {
                       this.state.person.lastName = val.target.value;
                       this.setState(this.state);
                     }}/>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={() => this.props.onDone(this.state.person)}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
