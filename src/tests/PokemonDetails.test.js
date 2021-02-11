import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('REQUISITO 7', () => {
  it('Iformações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/78');
    const heading = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push('/pokemons/25');
      const pikachuDetails = getByRole('heading', {
        level: 2,
        name: /pikachu details/i,
      });
      expect(pikachuDetails).toBeInTheDocument();
    });

  it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
    () => {
      const { queryByText, history } = renderWithRouter(<App />);
      history.push('/pokemons/25');
      const selectedPoke = queryByText(/More details/i);
      expect(selectedPoke).not.toBeInTheDocument();
    });

  it('Parágrafo com o resumo do Pokémon específico sendo visualizado',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/pokemons/65');
      const p = getByText('Closing both its eyes heightens all its other senses.'
      + ' This enables it to use its abilities to their extremes.');
      expect(p).toBeInTheDocument();
    });

  it('Existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/pokemons/65');
      const locations = getByText(/Game Locations of Alakazam/i);
      expect(locations).toBeInTheDocument();
    });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const textLocation = getByText('Faraway Island');
    expect(textLocation).toBeInTheDocument();
  });

  it('Exibidos, o nome da localização e uma imagem do mapa em cada localização;',
    () => {
      const { getByText, history, getByAltText } = renderWithRouter(<App />);
      history.push('/pokemons/151');
      const pokeMap = getByAltText(/Mew location/i);
      expect(pokeMap.src).toBe('https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
      const pokeLocation = getByText(/Faraway Island/i);
      expect(pokeLocation).toBeInTheDocument();
    });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { getByLabelText, history } = renderWithRouter(<App />);
      history.push('/pokemons/78');
      const label = getByLabelText('Pokémon favoritado?');
      expect(label).toBeInTheDocument();
      expect(label.checked).toEqual(false);

      userEvent.click(label);
      expect(label.checked).toEqual(true);
      userEvent.click(label);
      expect(label.checked).toEqual(false);
    });
});
