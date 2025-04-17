import { Pokemon, SpriteType } from "../../models/interfaces/Pokemon";
import { getImagenFromEnum } from "../../utils/functions/pokemon/getImagenFromEnum";
import { getKgFromHg } from "../../utils/functions/pokemon/getKgFromHg";

export const getPokemon = async (
  query: number | string
): Promise<Pokemon | undefined> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const rawData = await response.json();

    const imagen: string = SpriteType.OfficialArtworkFrontDefault;
    const sprite = getImagenFromEnum(rawData, imagen);

    if (response) {
      const pokemon: Pokemon = {
        id: rawData.id,
        name: rawData.name,
        image: sprite,
        stats: {
          hp: rawData.stats[0].base_stat,
          attack: rawData.stats[1].base_stat,
          defense: rawData.stats[2].base_stat,
          specialAttack: rawData.stats[3].base_stat,
          specialDefense: rawData.stats[4].base_stat,
          speed: rawData.stats[5].base_stat,
        },
        weight: getKgFromHg(rawData.weight),
        cries: {
          latest: rawData.cries.latest,
          legacy: rawData.cries.legacy,
        },
      };
      return pokemon;
    }
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    return undefined;
  }
};
