import styles from './Pokemon.module.css';
import { PokemonSpecies, Pokemon } from '../../models/Pokemon';
import { PokemonService } from '../../services/PokemonService';
import { PokemonUtils } from '../../utils/PokemonUtils';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import PokeLoader from '../../components/ui/loader/PokeLoader';
import PokemonStatsBars from '../../components/ui/graphics/PokemonStatsBars';

const PokemonPage = () => {
  const { id } = useParams();
  const pokemonService = new PokemonService();
  const [pokemonSpecies, setPokemonSpecies] = useState<
    (PokemonSpecies & { flavorText: string }) | null
  >(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const backgroundColor = PokemonUtils.getColorMap(
    pokemonSpecies?.color?.name || ''
  );

  const fetchPokemonData = useCallback(async () => {
    if (!id) return;
    const response = await pokemonService.getPokemonSpecies(id as string);
    setPokemonSpecies(response as PokemonSpecies & { flavorText: string });
    const idNumber = parseInt(id as string);
    const response2 = await pokemonService.getPokemon(idNumber);
    setPokemon(response2 as Pokemon);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (id === '0') return <div>Pokemon no encontrado, prueba con otro</div>;
  if (loading) return <PokeLoader />;
  if (!pokemonSpecies) return <div>No se encontró la Especie del pokemon</div>;
  if (!pokemon) return <div>No se encontró el pokemon</div>;
  return (
    <div className={styles.pokemonPage} style={{ backgroundColor }}>
      <header className={styles.headerPokemon}>
        <h1 className={styles.pokemonName}>{pokemon.name}</h1>
        <div className={`stats-container ${styles.statsContainer}`}>
          <PokemonStatsBars pokemon={pokemon} />
        </div>
        <img
          className={styles.pokemonImage}
          src={pokemon.image}
          alt={`Imagen del pokemon ${pokemon.name}`}
          onMouseEnter={() => pokemonService.playPokemonCry(pokemon)}
        />
      </header>

      <section className={styles.speciesInfo}>
        <div className={styles.containerInfo}>
          <ul className={styles.speciesList}>
            <li>
              <strong>Forma:</strong>{' '}
              {PokemonUtils.translateShapeToSpanish(
                pokemonSpecies?.shape?.name
              )}
            </li>
            <li>
              <strong>Dato General:</strong> {pokemonSpecies?.genera[5]?.genus}
            </li>
            <li>
              <strong>Tipo:</strong>{' '}
              {pokemon.types
                .map((type) => PokemonUtils.getTypeInSpanish(type.type.name))
                .join(', ')}
            </li>
          </ul>

          <section className={styles.flavorText}>
            {pokemonSpecies?.flavorText}
          </section>
        </div>
      </section>
    </div>
  );
};

export default PokemonPage;
