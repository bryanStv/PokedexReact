import styles from './Pokemon.module.css';
import { PokemonSpecies, Pokemon } from '../../models/Pokemon';
import { PokemonService } from '../../services/PokemonService';
import { PokemonUtils } from '../../utils/PokemonUtils';
import { useEffect, useState } from 'react';
import PokeLoader from '../../components/ui/loader/PokeLoader';
import PokemonStatsBars from '../../components/ui/graphics/PokemonStatsBars';
import { useLocation } from 'react-router-dom';

const PokemonPage = () => {
  const pokemonService = new PokemonService();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<
    (PokemonSpecies & { flavorText: string }) | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      // Obtener pokemonData del estado de navegación o de la URL
      const pokemonData = location.state?.pokemonData;

      if (pokemonData) {
        setPokemon(pokemonData);
        const speciesData = await pokemonService.getPokemonSpecies(
          pokemonData.id.toString()
        );
        setPokemonSpecies(
          speciesData as PokemonSpecies & { flavorText: string }
        );
      }
      setLoading(false);
    };

    fetchData();
  }, [location.state]);

  if (loading) return <PokeLoader />;
  if (!pokemon) return <div>No se encontró el Pokémon</div>;
  if (!pokemonSpecies) return <div>No se encontró la especie del Pokémon</div>;

  const backgroundColor = PokemonUtils.getColorMap(
    pokemonSpecies?.color?.name || ''
  );

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
