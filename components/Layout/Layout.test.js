import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import MockProviders from '../../utils/MockProviders';
import Layout from './Layout';

describe('<Layout />', () => {
  it('loads the component without errors', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Layout />
        </MockProviders>,
      )
      .toJSON();

    expect(tree).not.toBeNull();
  });
});
