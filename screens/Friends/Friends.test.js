import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import MockProviders from "../../utils/MockProviders";
import Friends from "./Friends";

describe('<Friends />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Friends />
        </MockProviders>
      )
      .toJSON();

    expect(tree).not.toBeNull();
  })
})
