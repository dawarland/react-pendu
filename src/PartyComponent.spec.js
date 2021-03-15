import React from 'react'
import ReactDOM from 'react-dom'
import PartyComponent from "./PartyComponent";
import renderer from 'react-test-renderer';
import Letter from "./Letter";

describe('<PartyComponent/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PartyComponent />, div)
  })

  it('respects good format', () => {
    const component = renderer.create(
        <PartyComponent word="TEST" tries={new Set()} />
    );
    expect(component.toJSON().length).toBe(2);
  })

})

