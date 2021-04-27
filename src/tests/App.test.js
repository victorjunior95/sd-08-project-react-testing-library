import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('req 1', () => {
  it('renderiza a página principal', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('contém um conjunto de links para navegação', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/');
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('redireciona ao clicar nos links', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const homeButtton = getByText('Home');
    const aboutButtton = getByText('About');
    const favoriteButtton = getByText('Favorite Pokémons');
    userEvent.click(homeButtton);
    expect(history.location.pathname).toBe('/');
    userEvent.click(aboutButtton);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(favoriteButtton);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('url desconhecida', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('digimon');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
