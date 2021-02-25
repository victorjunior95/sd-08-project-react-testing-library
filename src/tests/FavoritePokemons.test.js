import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

test('renders a reading with the text `No favorite pokemon found`', () => {
  const { getByText } = renderPath('/favorites');
  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});
