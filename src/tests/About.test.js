import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testes Requisito 2', () => {
   test('Teste se a página contém as informações sobre a Pokédex.', () => {
       const { getByText } = render(<About />);

       expect(getByText(/This application simulates/i)).toBeInTheDocument();
   });

   test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
       const { getByRole } = render(<About />);

       expect(getByRole('heading', {
           name: /About Pokédex/i,
           level: 2,
       }));
   });

   test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
       const { getByText } = render(<About />);

       expect(getByText(/This application/i)).toBeInTheDocument();
       expect(getByText(/One can/i)).toBeInTheDocument();
   });

   test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
       const { getByRole } = render(<About />);

       expect(getByRole('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
   });
});
