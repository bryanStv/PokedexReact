const getRandomPokemonId: () => number = () => {
  const max: number = 1025; // número total de pokémon
  const randomId: number = Math.floor(Math.random() * max) + 1;
  return randomId;
};

export default getRandomPokemonId;
