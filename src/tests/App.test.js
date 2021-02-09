import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('se renderiza uma leitura com o texto `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('se a página principal da Pokédex é renderizada de URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se o topo da aplicação contém um conjunto fixo de links', () => {
    const { getByRole } = renderWithRouter(<App />);
    ['Home', 'About', 'Favorite Pokémons'].map((link) => expect(getByRole('link', {
      name: link,
    })));
  });

  test(
    'se é redirecionada p/ a página inicial ao clicar no link Home.', () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const linkHome = getByRole('link', {
        name: 'Home',
      });
      fireEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    },
  );

  test(
    'se é redirecionada p/ a página about ao clicar no link About.', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      const linkHome = getByRole('link', {
        name: 'About',
      });
      fireEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    },
  );

  test(
    'se é redirecionada p/ a página about ao clicar no link About.', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      const linkHome = getByRole('link', {
        name: 'Favorite Pokémons',
      });
      fireEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  test(
    'se é redirecionada p/ a página Not Found  - URL desconhecida.', () => {
      const { history, getByText } = renderWithRouter(<App />);
      history.push('testerota');
      expect(getByText(/Page requested not found/)).not.toBeNull();
    },
  );
});
