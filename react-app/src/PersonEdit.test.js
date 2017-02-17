import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import PersonEdit from './PersonEdit';

describe('PersonEdit', () => {
  it('should update firstName', () => {
    const expected = {firstName: 'Alan', lastName: 'Turing'};
    const div = document.createElement('div');
    const personEdit = shallow(<PersonEdit person={expected}/>, div);
    personEdit.find('#firstName').simulate('change', {target: {name: 'firstName', value: 'Ford'}});
    expect(personEdit.state().person.firstName).toBe('Ford');
  });

  it('should update lastName', () => {
    const expected = {firstName: 'Alan', lastName: 'Turing'};
    const div = document.createElement('div');
    const personEdit = shallow(<PersonEdit person={expected}/>, div);
    personEdit.find('#lastName').simulate('change', {target: {name: 'lastName', value: 'Prefect'}});
    expect(personEdit.state().person.lastName).toBe('Prefect');
  });

  it('returns edited person', () => {
    const expected = {firstName: 'Alan', lastName: 'Turing'};
    const onDone = sinon.spy();
    const div = document.createElement('div');
    const personEdit = shallow(<PersonEdit person={expected} onDone={onDone}/>, div);

    personEdit.find('#firstName').simulate('change', {target: {name: 'firstName', value: 'Ford'}});
    personEdit.find('#lastName').simulate('change', {target: {name: 'lastName', value: 'Prefect'}});
    personEdit.find('button').simulate('click');

    expect(onDone.calledWith({firstName: 'Ford', lastName: 'Prefect'})).toBe(true);
  });

});
