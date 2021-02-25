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

test('renders a reading with the text `Page requested not found 😭`', () => {
  const { getByText } = renderPath('*');
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('renders a specific image', () => {
  const { getAllByRole } = renderPath('*');
  const gif = getAllByRole('img');
  expect(gif[1].src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
