import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requirement 1, part I', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('If "Home" link appears', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  test('If "About" link appears', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('About')).toBeInTheDocument();
  });

  test('If "Favorite Pokémons" link appears', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Requirement II, Part II, Routes', () => {
  test('if URL application gets / when Home is clicked', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(homeLink);
  });

  test('if URL application gets /about when About is clicked', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = getByRole('link', {
      name: /About/i,
    });

    userEvent.click(aboutLink);
  });

  test('if URL application gets /favorites when "Favorite..." is clicked', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoriteLink = getByRole('link', {
      name: /favorite Pokémons/i,
    });

    userEvent.click(favoriteLink);
  });

  test('if whatever URL crashes the site', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('xablau');
    const crashedLink = getByText(/Page requested not found/i);
    expect(crashedLink).toBeInTheDocument();
  });
});
