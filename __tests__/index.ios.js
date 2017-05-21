import 'react-native';
import React from 'react';
// eslint-disable-next-line import/extensions
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
// eslint-disable-next-line import/first
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />,
  );
  expect(tree).toBeDefined();
});
