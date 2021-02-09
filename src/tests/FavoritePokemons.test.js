// import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import renderWithRouter from '../services/renderWithRouter';
// import FavoritePokemons from '../components/FavoritePokemons';

// describe('Teste o componente <FavoritePokemons.js />', () => {
//   it('É exibido na tela a mensagem No favorite pokemon found?', () => {
//     const { container } = render(
//       <MemoryRouter>
//         <FavoritePokemons />
//       </MemoryRouter>,
//     );
//     const paragafo = container.querySelector('p');
//     expect(paragafo).toHaveTextContent(/No favorite pokemon found/i);
//   });

//   it('Teste se é exibido todos os cards de pokémons favoritados', () => {
//     const { getByRole } = renderWithRouter(<FavoritePokemons />);

//   });
// });
