import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../../../models/Pokemon';
import styles from './PokemonCard.module.css';
import PokeLoader from '../loader/PokeLoader';
import PokemonStatsBars from '../graphics/PokemonStatsBars';
import { PokemonUtils } from '../../../utils/PokemonUtils';

interface CardProps {
  pokemonData: Pokemon;
}

const PokemonCard = (props: CardProps) => {
  const { pokemonData } = props;
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      const result = await pokemonData;
      setPokemon(result);
      setLoading(false);
    };

    fetchPokemon();
  }, [pokemonData]);

  const handleToggleStats = () => setShowStats((prev) => !prev);

  if (loading) return <PokeLoader />;
  if (!pokemon) return <div>No se encontró el Pokémon</div>;

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      state={{ pokemonData: pokemon }}
      className={styles.link}
    >
      <div className={`card ${styles.card}`}>
        <div className={`card-body ${styles.cardBody}`}>
          <div className={`stats-container ${styles.statsContainer}`}>
            {(showStats || window.innerWidth > 768) && (
              <PokemonStatsBars pokemon={pokemon} />
            )}
          </div>
          {/* Solo se muestra el botón en pantallas pequeñas */}
          {window.innerWidth <= 768 && (
            <button
              className={styles.toggleButton}
              onClick={(e) => {
                e.preventDefault();
                handleToggleStats();
              }}
            >
              {showStats ? 'Ocultar Stats' : 'Mostrar Stats'}
            </button>
          )}
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div
          className={`card-footer ${styles.cardFooter}`}
          style={{
            background:
              pokemon.types.length > 1
                ? `linear-gradient(90deg, ${PokemonUtils.getTypeColor(pokemon.types[0].type.name)}, ${PokemonUtils.getTypeColor(pokemon.types[1].type.name)})`
                : PokemonUtils.getTypeColor(pokemon.types[0].type.name),
          }}
        >
          <h2>{pokemon.name}</h2>
          <p>
            <strong>ID: </strong>
            {pokemon.id} <strong>Peso: </strong>
            {pokemon.weight}Kg
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
