import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  let testLocation;
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
      <Route
        path="*"
        render={ ({ location }) => {
          testLocation = location;
          return null;
        } }
      />
      {/* Route utilizado a partir de consulta na documentação do React Router, link: https://reactrouter.com/web/guides/testing */}
    </MemoryRouter>,
  );
  expect(testLocation.pathname).toBe('/');
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  const homeLink = getByText('Home');
  userEvent.click(homeLink);
  expect(testLocation.pathname).toBe('/');
});

test('tests if there is a navbar on the page', () => {
  const { getByRole, getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByRole('navigation')).toBeInTheDocument();
  expect(getAllByRole('link')[0]).toHaveTextContent('Home');
  expect(getAllByRole('link')[1]).toHaveTextContent('About');
  expect(getAllByRole('link')[2]).toHaveTextContent('Favorite Pokémons');
});

test('tests the navigation when clicking the links on navbar', () => {
  let testLocation;
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
      <Route
        path="*"
        render={ ({ location }) => {
          testLocation = location;
          return null;
        } }
      />
      {/* Route utilizado a partir de consulta na documentação do React Router, link: https://reactrouter.com/web/guides/testing */}
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  userEvent.click(homeLink);
  expect(testLocation.pathname).toBe('/');
  const aboutLink = getByText('About');
  userEvent.click(aboutLink);
  expect(testLocation.pathname).toBe('/about');
  const favLink = getByText('Favorite Pokémons');
  userEvent.click(favLink);
  expect(testLocation.pathname).toBe('/favorites');
});

test('tests if it goes to Not Found page with a different path', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/digimons'] }>
      <App />
    </MemoryRouter>,
  );
  const notFoundText = getByText('Page requested not found');
  expect(notFoundText).toBeInTheDocument();
});
