import { useEffect, useState } from "react";
import { Pokemon } from "../../../models/interfaces/Pokemon";
import styles from "./PokemonCard.module.css";

interface CardProps {
  pokemonData: Promise<Pokemon | undefined>;
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
    <div className={`card ${styles.card}`}>
      <div className={`card-body ${styles.cardBody}`}>
        <div>
          <p>
            <strong>HP: </strong>
            {pokemon.stats.hp}
          </p>
          <p>
            <strong>Atack: </strong>
            {pokemon.stats.attack}
          </p>
          <p>
            <strong>Defense: </strong>
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
            <strong>Speed: </strong>
            {pokemon.stats.speed}
          </p>
        </div>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className={`card-footer ${styles.cardFooter}`}>
        <h2>{pokemon.name}</h2>
        <p>
          <strong>ID: </strong>
          {pokemon.id} <strong>Weight: </strong>
          {pokemon.weight}Kg
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
