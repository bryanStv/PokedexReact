import { Pokemon, SpriteType } from "../../models/interfaces/Pokemon";
import { getImagenFromEnum } from "../../utils/functions/pokemon/getImagenFromEnum";

export const getPokemon = async (id: number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const rawData = await response.json();

    const imagen: string = SpriteType.OfficialArtworkFrontDefault;
    const sprite = getImagenFromEnum(rawData, imagen);

    if (response) {
      const pokemon: Pokemon = {
        id: rawData.id,
        name: rawData.name,
        image: sprite,
      };
      return pokemon;
    }
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
  }
};
