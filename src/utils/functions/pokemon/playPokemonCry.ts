import { Pokemon } from "../../../models/interfaces/Pokemon";

const playPokemonCry = (pokemon: Pokemon) => {
  if (pokemon?.cries?.latest) {
    const audio = new Audio(pokemon.cries.latest);
    audio.play().catch((e) => {
      if (pokemon?.cries?.legacy) {
        const audio2 = new Audio(pokemon.cries.legacy);
        console.warn("Reproduciendo el grito legacy, no hay latest:", e);
        audio2.play().catch((error) => {
          console.warn("Error al reproducir el grito del Pokémon:", error);
        });
      }
    });
  }
};

export default playPokemonCry;
