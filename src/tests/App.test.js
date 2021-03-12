import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('testes', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial,', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
  });

  test('este se a aplicação é redirecionada para a página de About, na URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      const { getByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const linkFavorites = getByText(/Favorite Pokémons/i);
      expect(linkFavorites).toBeInTheDocument();
    });
});
