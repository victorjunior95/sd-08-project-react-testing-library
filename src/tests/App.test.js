import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('tests for navigation links', () => {
  test('test if exists links of navigation: home, about, favorite pokémons', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoriteLink = getByText('Favorite Pokémons');
    const navBar = getByRole('navigation');
    expect(navBar).toContainElement(homeLink);
    expect(navBar).toContainElement(aboutLink);
    expect(navBar).toContainElement(favoriteLink);
  });

  test('test home link functionality', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('test about link functionality', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('test favorite pokémons link functionality', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('test not found page functionality', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notHerePage');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
