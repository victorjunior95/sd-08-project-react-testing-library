import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('App tests', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('shows the correct text at the first link', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const firstLink = getAllByRole('link')[0];

    expect(firstLink).toHaveTextContent('Home');
  });

  it('shows the correct text at the second link', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const secondLink = getAllByRole('link')[1];

    expect(secondLink).toHaveTextContent('About');
  });

  it('shows the correct text at the third link', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const thirdLink = getAllByRole('link')[2];

    expect(thirdLink).toHaveTextContent('Favorite Pokémons');
  });

  it('Verifies if HOME returns to the main page', () => {
    // Esse teste foi feito com o auxílio do site:https://reactrouter.com/web/guides/testing
    let testLocation;
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );
    const home = getByText('Home');
    fireEvent.click(home);
    expect(testLocation.pathname).toBe('/');
  });

  it('Verifies if the element /about/ leads to the correct page', () => {
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
      </MemoryRouter>,
    );
    const about = getByText('About');
    fireEvent.click(about);
    expect(testLocation.pathname).toBe('/about');
  });

  it('Verifies if the element /favorite/ leads to the correct page', () => {
    // Esse teste foi feito com o auxílio do site:https://reactrouter.com/web/guides/testing
    let testLocation;
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );
    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    expect(testLocation.pathname).toBe('/favorites');
  });

  it('verifies if the application leads to the not found page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/XABLAU'] }>
        <App />
      </MemoryRouter>,
    );
    const notFoundText = getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
