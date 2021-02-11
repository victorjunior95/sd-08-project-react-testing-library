import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole(
      'heading',
      { level: 2 },
      { name: /Encountered pokémons/i },
    );
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Encountered pokémons/i);
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  it('O primeiro da lista deve ser mostrado se estiver no último da lista', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Mew/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { container } = renderWithRouter(<App />);
    const names = container.querySelectorAll('.pokemon-overview');
    expect(names).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getByRole, getByText } = renderWithRouter(<App />);
    const filter = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(filter).toHaveLength(seven);
    userEvent.click(getByRole('button', { name: /fire/i }));
    expect(getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/All/i)).toBeInTheDocument();
    userEvent.click(getByText(/All/i));
    expect(getByText(/All/i)).toBeInTheDocument();
  });

  it('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    // Os botões de filtragem devem ser dinâmicos;
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('button', { name: /Electric/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /fire/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Bug/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Poison/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Psychic/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Normal/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Dragon/i })).toBeInTheDocument();
  });

  it('O botão de Próximo deve ser desabilitado quando a lista tiver somente um', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('button', { name: /Electric/i }));
    const proximo = getByRole('button', { name: /próximo pokémon/i });
    expect(proximo.disabled).toBeTruthy();
  });
});
