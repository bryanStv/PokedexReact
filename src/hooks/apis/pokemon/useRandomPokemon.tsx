const getRandomPokemon = async () => {
  const max = 1025; // número total de pokémon (ajustable según actualizaciones)
  const randomId = Math.floor(Math.random() * max) + 1;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const data = await response.json();

    console.log(`Nombre: ${data.name}`);
    console.log(`Imagen: ${data.sprites.front_default}`);
    console.log(data);
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
  }
};

getRandomPokemon();
