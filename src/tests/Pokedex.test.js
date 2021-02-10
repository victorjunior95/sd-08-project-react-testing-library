import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('REQUISITO 5', () => {
  it('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2, name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const allBtn = getByText('All');
      const nextPokeBtn = getByText('Próximo pokémon');

      userEvent.click(allBtn);
      expect(getByText(/Pikachu/i)).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Charmander')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Caterpie')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Ekans')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Alakazam')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Mew')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Rapidash')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Snorlax')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Dragonair')).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
      expect(getByText('Pikachu')).toBeInTheDocument();
    });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const noPoke = getAllByText('Pikachu');
    expect(noPoke.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const typeBtn = queryAllByTestId('pokemon-type-button');
    console.log(typeBtn);
    expect(typeBtn[0].textContent).toBe('Electric');
  });
});
