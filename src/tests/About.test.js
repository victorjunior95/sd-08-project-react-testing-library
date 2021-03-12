import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Testando se as informações sobra a pokedex estão presentes', () => {
  // const { getByText } = renderWithRouter(<About />);
  // const text = 'This';
  // const par1 = getByText(text);
  // const par2 = getByText(
  //   'One can filter Pokémons by type, and see more details for each one of them',
  // );

  // expect(par1).toBeInTheDocument();
  // expect(par2).toBeInTheDocument();

  // Tirei inspiração para a utilização do container no site:
  // https://stackoverflow.com/questions/54593369/unable-to-find-an-element-with-the-text-mytext-error-when-using-react-testing
  const { container } = renderWithRouter(<About />);
  const paragrafos = container.querySelectorAll('p');
  const text1 = 'This application simulates a Pokédex, a';
  const text2 = 'digital encliclopedia containing all Pokémons ';

  expect(paragrafos.length).toBe(2);
  expect(paragrafos[0].innerHTML)
    .toBe(`${text1} ${text2}`);
  expect(paragrafos[1].innerHTML)
    .toBe('One can filter Pokémons by type, and see more details for each one of them');
});

test('Testando se o cabeçalho da pagina está presente', () => {
  const { getByRole } = renderWithRouter(<About />);

  expect(getByRole('heading').innerHTML).toBe('About Pokédex');
});

test('Testando se a imagem está presente', () => {
  const { getByRole } = renderWithRouter(<About />);

  expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
