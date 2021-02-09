import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const history = createBrowserHistory();
  const { getByText } = render(
    <Router initialEntries={ ['/'] } history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();

  const homeBtn = getByText('Home');
  const aboutBtn = getByText('About');
  const favoriteBtn = getByText('Favorite Pokémons');
  expect(homeBtn).toBeInTheDocument();
  expect(aboutBtn).toBeInTheDocument();
  expect(favoriteBtn).toBeInTheDocument();

  userEvent.click(homeBtn);
  expect(history.location.pathname).toBe('/');

  userEvent.click(aboutBtn);
  expect(history.location.pathname).toBe('/about');
  expect(getByText('About Pokédex')).toBeInTheDocument();

  userEvent.click(favoriteBtn);
  expect(history.location.pathname).toBe('/favorites');
  expect(getByText('Favorite pokémons')).toBeInTheDocument();

  history.push('/seila');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
