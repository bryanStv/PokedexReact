import {
  PokemonSpecies,
  FlavorTextEntry,
} from "../../models/interfaces/Pokemon";
import { API_POKEMON_SPECIES } from "../apis";

export const getPokemonSpecies = async (
  id: string
): Promise<(PokemonSpecies & { flavorText: string }) | undefined> => {
  try {
    const response = await fetch(`${API_POKEMON_SPECIES}${id}`);
    const rawData: PokemonSpecies = await response.json();

    // Buscar la primera descripción en español disponible
    const flavorTextES = rawData.flavor_text_entries.find(
      (entry: FlavorTextEntry) => entry.language.name === "es"
    );

    return {
      ...rawData,
      flavorText:
        flavorTextES?.flavor_text.replace(/[\f\n\r]/g, " ").trim() ||
        "Descripción no disponible en español.",
    };
  } catch (error) {
    console.error("Error al obtener datos de la especie del Pokémon:", error);
  }
};
