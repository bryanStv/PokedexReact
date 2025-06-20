import PokemonCard from '../../components/ui/cards/PokemonCard';
import style from './Home.module.css';
import { Pokemon } from '../../models/Pokemon';
import { PokemonService } from '../../services/PokemonService';
import PokeLoader from '../../components/ui/loader/PokeLoader';

import { useEffect, useState } from 'react';

const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const pokemonService = new PokemonService();

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonData = await pokemonService.getPokemon(
        pokemonService.getRandomPokemonId()
      );
      setPokemon(pokemonData);
    };
    fetchPokemon();
  }, []);

  return (
    <>
      {pokemon ? (
        <div className={style.homePageContainer}>
          <div>
            <h1 style={{ textAlign: 'center' }}>
              Dile hola a tu nuevo Pokémon favorito:
            </h1>
            <PokemonCard pokemonData={pokemon} />
          </div>
          <div>
            Esto es un placeholder hasta que se me ocurra que añadir aquí,
            sugerencias al whatsApp 😁
          </div>
        </div>
      ) : (
        <>
          <PokeLoader />
        </>
      )}
    </>
  );
};

export default Home;
