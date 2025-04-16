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
      <div className="card-body">
        <h5>{pokemon.id}</h5>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="card-footer">
        <h2>{pokemon.name}</h2>
      </div>
    </div>
  );
};

export default PokemonCard;
