import 'react-native';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers';
import Main from '../../components/Main';

// Note: test renderer must be required after react-native.
// eslint-disable-next-line import/first
import renderer from 'react-test-renderer';

const store = createStore(
  reducer,
);

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Main />
    </Provider>
  );
  expect(tree).toBeDefined();
});
