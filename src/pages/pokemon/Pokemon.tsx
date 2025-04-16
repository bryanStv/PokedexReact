import styles from "./Pokemon.module.css";
import { PokemonSpecies, Pokemon } from "../../models/interfaces/Pokemon";
import { getPokemonSpecies, getPokemon } from "../../services/index";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const PokemonPage = () => {
  const { id } = useParams();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemonData = useCallback(async () => {
    if (!id) return;
    const response = await getPokemonSpecies(id as string);
    setPokemonSpecies(response as PokemonSpecies);
    const idNumber = parseInt(id as string);
    const response2 = await getPokemon(idNumber);
    setPokemon(response2 as Pokemon);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (loading) return <div>Loading...</div>;
  if (!pokemonSpecies) return <div>No se encontró la Especie del pokemon</div>;
  if (!pokemon) return <div>No se encontró el pokemon</div>;
  return (
    <div className={styles.pokemonPage}>
      <header className={styles.headerPokemon}>
        <h1 className={styles.pokemonName}>{pokemon.name}</h1>
        <img
          className={styles.pokemonImage}
          src={pokemon.image}
          alt={`Imagen del pokemon ${pokemon.name}`}
        />
      </header>

      <section className={styles.speciesInfo}>
        <h2 className={styles.speciesTitle}>Información de la Especie</h2>
        <ul className={styles.speciesList}>
          <li>
            <strong>Color:</strong> {pokemonSpecies?.color?.name}
          </li>
          <li>
            <strong>Hábitat:</strong> {pokemonSpecies?.habitat?.name}
          </li>
          <li>
            <strong>Forma:</strong> {pokemonSpecies?.shape?.name}
          </li>
          <li>
            <strong>Tasa de Género:</strong> {pokemonSpecies?.gender_rate}
          </li>
          <li>
            <strong>Generación:</strong> {pokemonSpecies?.genera[5]?.genus}
          </li>
        </ul>

        <section className={styles.flavorText}>
          <h3>Descripción:</h3>
          <p>{pokemonSpecies?.flavor_text_entries[26]?.flavor_text}</p>
        </section>
      </section>
    </div>
  );
};

export default PokemonPage;
