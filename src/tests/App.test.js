import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Default', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Requisito 1: Teste o componente <App.js />', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      const { getByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const firstLink = getByText('Home');
      const secondLink = getByText('About');
      const thirdLink = getByText('Favorite Pokémons');

      expect(firstLink).toBeInTheDocument();
      expect(secondLink).toBeInTheDocument();
      expect(thirdLink).toBeInTheDocument();
    });

  test('Teste se após clicar em home a página é redirecionada para "/"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: 'Home',
    });
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se após clicar em about a página é redirecionada para "/about"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: 'About',
    });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se após clicar em favorites a página é redirecionada para  "/favorites"',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const favorites = getByRole('link', {
        name: 'Favorite Pokémons',
      });
      fireEvent.click(favorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  test('Teste se é redirecionado para Not Found ao entrar em uma URL desconhecida',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('blabla');
      const notFound = getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });
});
