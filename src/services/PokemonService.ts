import {
  Pokemon,
  PokemonSpecies,
  SpriteType,
  FlavorTextEntry,
  PokemonName,
  PokemonType,
} from '../models/Pokemon';
import { PokemonUtils } from '../utils/PokemonUtils';
import data from '../assets/data/pokedex.json';

export class PokemonService {
  private readonly API_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly API_POKEMON_SPECIES =
    'https://pokeapi.co/api/v2/pokemon-species/';

  getPokemon = async (query: number | string): Promise<Pokemon | undefined> => {
    try {
      const response = await fetch(`${this.API_POKEMON}${query}`);
      const rawData = await response.json();

      const imagen: string = SpriteType.OfficialArtworkFrontDefault;
      const sprite = PokemonUtils.getImagenFromEnum(rawData, imagen);

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
          weight: PokemonUtils.getKgFromHg(rawData.weight),
          cries: {
            latest: rawData.cries.latest,
            legacy: rawData.cries.legacy,
          },
          types: rawData.types.map((type: any) => ({
            slot: type.slot,
            type: {
              name: type.type.name as PokemonType,
              url: type.type.url,
            },
          })),
        };
        return pokemon;
      }
    } catch (error) {
      console.error('Error al obtener el Pokémon:', error);
      return undefined;
    }
  };

  getPokemonSpecies = async (
    id: string
  ): Promise<(PokemonSpecies & { flavorText: string }) | undefined> => {
    try {
      const response = await fetch(`${this.API_POKEMON_SPECIES}${id}`);
      const rawData: PokemonSpecies = await response.json();

      // Buscar la primera descripción en español disponible
      const flavorTextES = rawData.flavor_text_entries.find(
        (entry: FlavorTextEntry) => entry.language.name === 'es'
      );

      return {
        ...rawData,
        flavorText:
          flavorTextES?.flavor_text.replace(/[\f\n\r]/g, ' ').trim() ||
          'Descripción no disponible en español.',
      };
    } catch (error) {
      console.error('Error al obtener datos de la especie del Pokémon:', error);
    }
  };

  getPokemonNamesFromJson = (query: string): string[] => {
    if (query.length < 3) return [];

    const lowerQuery = query.toLowerCase();

    return (data as PokemonName[])
      .filter((p) => p.name.english.toLowerCase().includes(lowerQuery))
      .map((p) => p.name.english);
  };

  playPokemonCry = (pokemon: Pokemon) => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play().catch((e) => {
        if (pokemon?.cries?.legacy) {
          const audio2 = new Audio(pokemon.cries.legacy);
          console.warn('Reproduciendo el grito legacy, no hay latest:', e);
          audio2.play().catch((error) => {
            console.warn('Error al reproducir el grito del Pokémon:', error);
          });
        }
      });
    }
  };
}
