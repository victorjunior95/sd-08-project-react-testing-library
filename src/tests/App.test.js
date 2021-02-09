import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWhitRouter from './renderWithRouter';

describe('App.js ', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWhitRouter(<App />);
    const HomeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(HomeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('O segundo link deve possuir o texto About.', () => {
    const { history } = renderWhitRouter(<App />);
    const AboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(AboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons. ', () => {
    const { history } = renderWhitRouter(<App />);
    const HomeLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(HomeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });
// test('shows the Pokédex when the route is `/`', () => {
//   const { getByText } = render(
//     <MemoryRouter initialEntries={ ['/'] }>
//       <App />
//     </MemoryRouter>,
//   );

//   expect(getByText('Encountered pokémons')).toBeInTheDocument();
// });
