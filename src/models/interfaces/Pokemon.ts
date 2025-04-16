export interface Pokemon {
  id?: number;
  name: string;
  image: string;
}

export enum SpriteType {
  FrontDefault = "sprites.front_default",
  FrontShiny = "sprites.front_shiny",
  BackDefault = "sprites.back_default",
  BackShiny = "sprites.back_shiny",
  FrontFemale = "sprites.front_female",
  BackFemale = "sprites.back_female",
  FrontShinyFemale = "sprites.front_shiny_female",
  BackShinyFemale = "sprites.back_shiny_female",
  OfficialArtworkFrontDefault = "sprites.other.official-artwork.front_default",
  OfficialArtworkFrontShiny = "sprites.other.official-artwork.front_shiny",
}
