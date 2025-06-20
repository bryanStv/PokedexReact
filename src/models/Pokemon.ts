export interface Pokemon {
  id?: number;
  name: string;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  weight: number;
  cries?: Cries;
  types: {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }[];
}

interface Cries {
  latest: string;
  legacy: string;
}

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | string;

export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string };
  version: { name: string };
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: { name: string };
  egg_groups: { name: string }[];
  evolution_chain: { url: string };
  habitat: { name: string };
  gender_rate: number;
  genera: { genus: string; language: { name: string } }[];
  generation: { name: string };
  growth_rate: { name: string };
  shape: { name: string };
  evolves_from_species: null | { name: string };
  flavor_text_entries: FlavorTextEntry[];
}

export enum SpriteType {
  FrontDefault = 'sprites.front_default',
  FrontShiny = 'sprites.front_shiny',
  BackDefault = 'sprites.back_default',
  BackShiny = 'sprites.back_shiny',
  FrontFemale = 'sprites.front_female',
  BackFemale = 'sprites.back_female',
  FrontShinyFemale = 'sprites.front_shiny_female',
  BackShinyFemale = 'sprites.back_shiny_female',
  OfficialArtworkFrontDefault = 'sprites.other.official-artwork.front_default',
  OfficialArtworkFrontShiny = 'sprites.other.official-artwork.front_shiny',
}

export interface PokemonName {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
}

export type Generation = {
  id: number;
  label: string;
  startId: number;
  endId: number;
};
