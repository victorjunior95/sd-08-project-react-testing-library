// import userEvent from '@testing-library/user-event';
// import React from 'react';
// import App from '../App';
// import renderWithRouter from '../renderWithRouter';

// describe('Tests the PokemonDetails component', () => {
//   it('Should have <Pokemon Name> Details', () => {
//     const { getByText, getByRole, history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);

//     const pokemonDetails = getByRole('heading', {
//       level: 2,
//       name: /Pikachu details/i,
//     });
//     expect(pokemonDetails).toBeInTheDocument();
//   });

//   it('Should not exist the navigation link for details of the selected Pokémon', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);

//     expect(linkDetails).not.toBeInTheDocument();
//   });

//   it('Should contains a heading <h2>Summary</h2>', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);

//     expect(getByText(/summary/i)).toBeInTheDocument();
//   });

//   it('Must contain a <p>summary of the selected Pokémon</p>', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);

//     expect(getByText(/This intelligent Pokémon roasts hard/i)).toBeInTheDocument();
//   });
// });

// describe('There must be a section containing location Pokémon map', () => {
//   it('Should contains a heading <h2>Game Locations of Selected Pokémon</h2>', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);

//     expect(getByText(/Game locations of Pikachu/i)).toBeInTheDocument();
//   });

//   it('Must be shown all Pokémon locations', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);

//     expect(getByText(/Pikachu location/i)).toBeInTheDocument();
//   });

//   it('Must be shown each name location and its image map', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//     const linkDetails = getByText(/More details/i);
//     userEvent.click(linkDetails);
//     const locationMap = getByText(/Pikachu location/i);

//     expect(locationMap.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
//   });
// });

// test('The user can favorite a Pokémon through the details page', () => {
//   const { getByText, history } = renderWithRouter(<App />);
//   history.push('/pokemons/25');
//   const linkDetails = getByText(/More details/i);
//   userEvent.click(linkDetails);

//   expect(getByText(/Pokémon favoritado/i)).toBeInTheDocument();
// });
