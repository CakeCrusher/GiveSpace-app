import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import MockProviders from '../../utils/MockProviders';
import Home from './Home';

describe('<Home />', () => {
  it('loads the component without errors', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Home />
        </MockProviders>,
      )
      .toJSON();

    expect(tree).not.toBeNull();
  });
});
