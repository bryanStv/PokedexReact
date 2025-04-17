import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../../models/interfaces/Pokemon";
import styles from "./PokemonCard.module.css";

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

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>No se encontró el Pokémon</div>;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.link}>
      <div className={`card ${styles.card}`}>
        <div className={`card-body ${styles.cardBody}`}>
          <div>
            <p>
              <strong>HP: </strong>
              {pokemon.stats.hp}
            </p>
            <p>
              <strong>Ataque: </strong>
              {pokemon.stats.attack}
            </p>
            <p>
              <strong>Defensa: </strong>
              {pokemon.stats.defense}
            </p>
            <p>
              <strong>Sp.Atk: </strong>
              {pokemon.stats.specialAttack}
            </p>
            <p>
              <strong>Sp.Def: </strong>
              {pokemon.stats.specialDefense}
            </p>
            <p>
              <strong>Velocidad: </strong>
              {pokemon.stats.speed}
            </p>
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
