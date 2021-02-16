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

describe('App.js', () => {
  it('the Pokédex main page is rendered when loading the application in the URL / path',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push('/');

      const homeTitle = getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(homeTitle).toBeInTheDocument();
    });
  it('top of the application contains a fixed set of navigation links', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const links = getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
  it('the application is redirected to the home page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      const homeButton = getByText(/home/i);
      userEvent.click(homeButton);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });
  it('the application is redirected to the About page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      const aboutButton = getByText(/about/i);
      userEvent.click(aboutButton);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });
  it('the application is redirected to the Favorite Pokémons page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      const favoriteButton = getByText(/Favorite Pokémons/i);
      userEvent.click(favoriteButton);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
  it('the application is redirected to the Not Found page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/nonexistent');
      const noMatch = getByText(/Page requested not found/i);
      expect(noMatch).toBeInTheDocument();
    });
});
