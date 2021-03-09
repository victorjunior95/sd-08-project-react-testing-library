import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
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

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('Verifica se possui um Link com o texto Home', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('Home')).toBeDefined();
    });
    it('Verifica se possui um Link com o texto About', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('About')).toBeInTheDocument();
    });
    it('Verifica se possui um Link com o texto Favorite Pokémons', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('Favorite Pokémons')).toBeInTheDocument();
    });
  });

describe('Testes de Rotas', () => {
  it('Teste se a aplicação é redirecionada para a página inicial',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/Home/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('Teste se a aplicação é redirecionada para o About',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/About/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  it('Teste se a aplicação é redirecionada para Pokémons Favoritos',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/Favorite Pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Teste se a aplicação é redirecionada para a página Not Found.',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');
      const pagina = getByRole('heading', {
        level: 2,
        name: /Page requested not found Crying emoji/i,
      });
      expect(pagina).toBeInTheDocument();
    });
});
