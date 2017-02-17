import React from 'react';
import {shallow} from 'enzyme'
import App from './App';
import PersonEdit from './PersonEdit';

describe('PersonEdit', () => {
  it('copies props to state', () => {
    const person = {
      firstName: 'John',
      lastName: 'Smith'
    };
    const div = document.createElement('div');
    const personEdit = shallow(<PersonEdit person={person}/>, div);

    expect(personEdit.state().person).toBe(person);
  });

  it('returns edited person', () => {
    const person = {
      firstName: 'John',
      lastName: 'Smith'
    };
    let actual;
    const onDone = (result) => actual = result;
    const div = document.createElement('div');
    const personEdit = shallow(<PersonEdit person={person} onDone={onDone}/>, div);

    personEdit.node._self.handleInputChange({
      target: {
        name: 'firstName',
        value: 'Fred'
      }
    });
    personEdit.node._self.onDone();

    expect(personEdit.state().person.firstName).toBe('Fred');
    expect(personEdit.state().person.lastName).toBe('Smith');
    expect(actual.firstName).toBe('Fred');
    expect(actual.lastName).toBe('Smith');
  });

});
