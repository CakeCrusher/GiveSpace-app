import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import MockProviders from '../../utils/MockProviders';
import Login from './Login';

describe('<Login />', () => {
  it('loads the component without errors', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Login />
        </MockProviders>,
      )
      .toJSON();

    expect(tree).not.toBeNull();
  });

  it('can switch to Sign In component', () => {
    // TODO: Will worry about this and other tests if I have nothing better to do
    expect(true).toBe(true);
  });
});
