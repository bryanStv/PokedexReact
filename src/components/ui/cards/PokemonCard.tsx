import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../../models/interfaces/Pokemon";
import styles from "./PokemonCard.module.css";
import {
  calculateStatPercentage,
  //MAX_STAT,
} from "../../../utils/functions/pokemon/calculateStatPercentage";
import StatBar from "../graphics/StatBar";
import PokeLoader from "../loader/PokeLoader";

interface CardProps {
  pokemonData: Pokemon;
}

const PokemonCard = (props: CardProps) => {
  const { pokemonData } = props;
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const result = await pokemonData;
      setPokemon(result);
      setLoading(false);
    };

    fetchPokemon();
  }, [pokemonData]);

  if (loading) return <PokeLoader />;
  if (!pokemon) return <div>No se encontró el Pokémon</div>;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.link}>
      <div className={`card ${styles.card}`}>
        <div className={`card-body ${styles.cardBody}`}>
          <div className={`stats-container ${styles.statsContainer}`}>
            <StatBar
              label="HP"
              value={pokemon.stats.hp}
              percentage={calculateStatPercentage(pokemon.stats.hp)}
            />
            <StatBar
              label="Ataque"
              value={pokemon.stats.attack}
              percentage={calculateStatPercentage(pokemon.stats.attack)}
            />
            <StatBar
              label="Defensa"
              value={pokemon.stats.defense}
              percentage={calculateStatPercentage(pokemon.stats.defense)}
            />
            <StatBar
              label="Sp.Atk"
              value={pokemon.stats.specialAttack}
              percentage={calculateStatPercentage(pokemon.stats.specialAttack)}
            />
            <StatBar
              label="Sp.Def"
              value={pokemon.stats.specialDefense}
              percentage={calculateStatPercentage(pokemon.stats.specialDefense)}
            />
            <StatBar
              label="Velocidad"
              value={pokemon.stats.speed}
              percentage={calculateStatPercentage(pokemon.stats.speed)}
            />
          </div>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className={`card-footer ${styles.cardFooter}`}>
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
