import data from "../../assets/data/pokedex.json";

interface PokemonName {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
}

export const getPokemonNamesFromJson = (query: string): string[] => {
  if (query.length < 3) return [];

  const lowerQuery = query.toLowerCase();

  return (data as PokemonName[])
    .filter((p) => p.name.english.toLowerCase().includes(lowerQuery))
    .map((p) => p.name.english);
};
