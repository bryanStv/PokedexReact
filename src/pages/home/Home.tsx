import PokemonCard from "../../components/ui/cards/PokemonCard";
import style from "./Home.module.css";
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
      {pokemon ? (
        <div className={style.homePageContainer}>
          <div>
            <h1 style={{ textAlign: "center" }}>
              El Pokemon que te toca hoy es:
            </h1>
            <PokemonCard pokemonData={pokemon} />
          </div>
          <div>
            Esto es un placeholder hasta que se me ocurra que añadir aquí,
            sugerencias al whatsApp 😁
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Cargando...</p>
      )}
    </>
  );
};

export default Home;
