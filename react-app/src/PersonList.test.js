import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import PersonList from './PersonList';

describe('PersonList', () => {
  it('should render people', () => {
    const expected = [
      {firstName: 'Alan', lastName: 'Turing'},
      {firstName: 'Alanzo', lastName: 'Church'}
    ];
    const div = document.createElement('div');
    const personList = shallow(<PersonList people={expected}/>, div);
    const actual = personList.find('li');
    expect(actual).toHaveLength(2);
  });

  it('has clickable people', () => {
    const people = [
      {firstName: 'Alan', lastName: 'Turing'}
    ];
    const onEdit = sinon.stub();
    const div = document.createElement('div');
    const personList = shallow(<PersonList people={people} onEdit={onEdit} />, div);

    expect(personList.find('a')).toHaveLength(2);
    personList.find('a').simulate('click');
    expect(onEdit.calledOnce).toBe(true);
  });

});
