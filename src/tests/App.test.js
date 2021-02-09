import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');
      expect(links[0].innerHTML).toBe('Home');
      expect(links[1].innerHTML).toBe('About');
      expect(links[2].innerHTML).toBe('Favorite Pokémons');
    });

  it('Teste se a aplicação é redirecionada para a página inicial',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');
      userEvent.click(links[0]);
      const homeH2 = screen.getByText('Encountered pokémons');
      expect(homeH2).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a página de About',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');
      userEvent.click(links[1]);
      const aboutH2 = screen.getByText('About Pokédex');
      expect(aboutH2).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');
      userEvent.click(links[2]);
      const favsH2 = screen.getByText('Favorite pokémons');
      expect(favsH2).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a página Not Found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/ajidsjaoisdj');
      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });
});
