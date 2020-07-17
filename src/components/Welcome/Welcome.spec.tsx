import React from "react";
import renderer from 'react-test-renderer';

import { Welcome } from './welcome';

describe("Welcome component", () => {
  it("should render", () => {
    const tree = renderer.create(
      <Welcome/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
