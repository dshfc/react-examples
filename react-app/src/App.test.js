import React from 'react';
import { shallow } from 'enzyme'
import App from './App';
import PersonList from './PersonList';
import PersonEdit from './PersonEdit';

describe('App', () => {
  it('renders a PersonList by default', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    const personList = app.find(PersonList.name);

    expect(app.state().editing).toBe(null);
    expect(personList.props().people).toBe(app.state().people);
  });

  it('can switch to edit mode', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    app.node._self.onEdit(app.state().people[0]);
    const personEdit = app.find(PersonEdit.name);

    expect(app.state().editing).toBe(app.state().people[0]);
    expect(personEdit.props().person).toBe(app.state().people[0]);
  });

  it('can switch to list mode', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    app.node._self.onEdit(app.state().people[0]);

    app.node._self.onDone(app.state().people[0]);
    const personList = app.find(PersonList.name);

    expect(app.state().editing).toBe(null);
    expect(personList.props().people).toBe(app.state().people);
  });
});
