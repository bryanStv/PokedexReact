import PokemonCard from "../../components/ui/cards/PokemonCard";
import { Pokemon } from "../../models/interfaces/Pokemon";
import { getPokemon } from "../../services/index";
import getRandomPokemonId from "../../utils/functions/pokemon/getRandomPokemonId";

import { useEffect, useState } from "react";

const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonData = await getPokemon(getRandomPokemonId());
      setPokemon(pokemonData);
    };
    fetchPokemon();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>El Pokemon que te toca es:</h1>
      {pokemon ? (
        <PokemonCard pokemonData={pokemon} />
      ) : (
        <p style={{ textAlign: "center" }}>Cargando...</p>
      )}
    </>
  );
};

export default Home;
