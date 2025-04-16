import {
  PokemonSpecies,
  FlavorTextEntry,
} from "../../models/interfaces/Pokemon";

export const getPokemonSpecies = async (
  id: string
): Promise<(PokemonSpecies & { flavorText: string }) | undefined> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const rawData: PokemonSpecies = await response.json();

    // Buscar la primera descripción en español disponible
    const flavorTextES = rawData.flavor_text_entries.find(
      (entry: FlavorTextEntry) => entry.language.name === "es"
    );

    return {
      ...rawData,
      flavorText:
        flavorTextES?.flavor_text || "Descripción no disponible en español.",
    };
  } catch (error) {
    console.error("Error al obtener datos de la especie del Pokémon:", error);
  }
};

// import { PokemonSpecies } from "../../models/interfaces/Pokemon";

// export const getPokemonSpecies = async (
//   id: string
// ): Promise<PokemonSpecies | undefined> => {
//   try {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon-species/${id}`
//     );
//     const data: PokemonSpecies = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching Pokémon species:", error);
//   }
// };
