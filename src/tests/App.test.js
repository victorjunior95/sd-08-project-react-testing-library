import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste App Requisito 01', () => {
  test('renders a reading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter history={ history }>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const leftClick = { button: 0 };
    userEvent.click(home, leftClick);
    expect(history.location.pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const fav = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(fav).toBeInTheDocument();
  });
});
