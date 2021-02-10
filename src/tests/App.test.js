import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

test('renders <App>', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favPoke = getByText(/Favorite Pokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favPoke).toBeInTheDocument();

  fireEvent.click(home);
  expect(history.location.pathname).toBe('/');

  fireEvent.click(about);
  expect(history.location.pathname).toBe('/about');

  fireEvent.click(favPoke);
  expect(history.location.pathname).toBe('/favorites');
});
