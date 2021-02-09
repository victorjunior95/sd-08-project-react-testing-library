import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <About />', () => {
  test.todo('Teste se a página contém as informações sobre a Pokédex.', () => {
    const text = 'One can filter Pokémons by type, and see more details for';
    const { getByText } = renderWithRouter('/about');
    expect(getByText(new RegExp(text, 'i'))).toBeInTheDocument();
  });

  test.todo('Teste se a página contém um heading h2 com o texto About Pokédex.');

  test.todo('Teste se a página contém dois parágrafos com texto sobre a Pokédex.');

  test.todo('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.');
});
