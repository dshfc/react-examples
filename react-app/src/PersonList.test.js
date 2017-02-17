import React from 'react';
import { shallow } from 'enzyme'
import PersonList from './PersonList';

describe('App', () => {
  it('renders a list of people', () => {
    const people = [
      {
        firstName: 'Alan',
        lastName: 'Turing'
      },
      {
        firstName: 'Alanzo',
        lastName: 'Church'
      }
    ];
    const div = document.createElement('div');
    const personList = shallow(<PersonList people={people} />, div);

    expect(personList.find('li')).toHaveLength(2);
  });

});
