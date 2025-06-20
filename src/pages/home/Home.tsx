import PokemonCard from '../../components/ui/cards/PokemonCard';
import style from './Home.module.css';
import { PokemonUtils } from '../../utils/PokemonUtils';
import PokeLoader from '../../components/ui/loader/PokeLoader';
import { usePokemon } from '../../hooks/usePokemon';
import { useEffect, useState } from 'react';

const Home = () => {
  const [randomId, setRandomId] = useState<number | null>(null);
  const {
    data: pokemon,
    isLoading,
    isFetching,
    error,
  } = usePokemon(randomId || -1);

  useEffect(() => {
    setRandomId(PokemonUtils.getRandomPokemonId());
  }, []);

  if (isLoading || isFetching) {
    return <PokeLoader />;
  }

  if (pokemon === undefined && !isLoading) {
    return <div>Error al cargar el Pokémon: {error?.message}</div>;
  }

  if (error) {
    return <div>Error al cargar el Pokémon: {error.message}</div>;
  }

  return (
    <>
      <div className={style.homePageContainer}>
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Dile hola a tu nuevo Pokémon favorito
          </h1>
          <PokemonCard pokemonData={pokemon!} />
        </div>
        <div>
          Esto es un placeholder hasta que se me ocurra que añadir aquí,
          sugerencias al whatsApp 😁
        </div>
      </div>
    </>
  );
};

export default Home;
