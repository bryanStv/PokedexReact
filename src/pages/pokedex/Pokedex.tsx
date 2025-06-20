import style from './Pokedex.module.css';
import { Fragment, useState } from 'react';
import PokemonCard from '../../components/ui/cards/PokemonCard';
import { Pokemon } from '../../models/Pokemon';
import PokeLoader from '../../components/ui/loader/PokeLoader';
import { PokemonService } from '../../services/PokemonService';
import { PokemonUtils } from '../../utils/PokemonUtils';
import { useQuery } from '@tanstack/react-query';

const Pokedex = () => {
  const pokemonService = new PokemonService();
  const [startId, setStartId] = useState<number>(1);
  const pokemonsPerPage = 9;

  const fetchPokemons = async (startId: number): Promise<Pokemon[]> => {
    const endId = startId + pokemonsPerPage - 1;
    const promises: Promise<Pokemon | undefined>[] = [];

    for (let i = startId; i <= endId; i++) {
      promises.push(pokemonService.getPokemon(i));
    }

    const results = await Promise.all(promises);
    return results.filter((p): p is Pokemon => p !== undefined);
  };

  const {
    data: pokemonsData = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['pokemons', startId],
    queryFn: () => fetchPokemons(startId),
    placeholderData: (previousData) => previousData ?? [],
    staleTime: 30 * 60 * 1000, // 30 minutos
  });

  const handleNextPage = () => {
    if (startId < 1023) {
      setStartId((prev) => prev + pokemonsPerPage);
    }
  };

  const handlePrevPage = () => {
    if (startId > 1) {
      setStartId((prev) => prev - pokemonsPerPage);
    }
  };

  const handleChangeGeneration = (generation: number) => {
    setStartId(generation);
  };

  if (isLoading && !pokemonsData.length) {
    return <PokeLoader />;
  }

  if (isError) {
    return (
      <div>
        Error al cargar los Pokémon:{' '}
        {error instanceof Error ? error.message : 'Error desconocido'}
      </div>
    );
  }

  return (
    <>
      <div className={style.buttonGroup}>
        {PokemonUtils.getGenerationData().map(({ label, id }) => (
          <button
            key={label}
            className={style.genButton}
            onClick={() => handleChangeGeneration(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {pokemonsData.map((pokemonData: Pokemon) => (
          <Fragment key={pokemonData.id}>
            <PokemonCard pokemonData={pokemonData} />
          </Fragment>
        ))}
        {isFetching && <PokeLoader />}
      </div>
      <div className={style.containerButtons}>
        <button
          className={style.genButton}
          onClick={handlePrevPage}
          disabled={startId === 1}
        >
          Anterior
        </button>
        <span className={style.pageTag}>
          {startId} al {Math.min(startId + pokemonsPerPage - 1, 1023)}
        </span>
        <button
          className={style.genButton}
          onClick={handleNextPage}
          disabled={startId === 1023}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Pokedex;
