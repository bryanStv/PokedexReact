import styles from "./Pokemon.module.css";
import { PokemonSpecies, Pokemon } from "../../models/interfaces/Pokemon";
import { getPokemonSpecies, getPokemon } from "../../services/index";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PokeLoader from "../../components/ui/loader/PokeLoader";
import { colorMap } from "../../models/records/ColorMap";
import { translateShapeToSpanish } from "../../utils/functions/pokemon/translateShapeToSpanish";
import PokemonStatsBars from "../../components/ui/graphics/PokemonStatsBars";
import playPokemonCry from "../../utils/functions/pokemon/playPokemonCry";

const PokemonPage = () => {
  const { id } = useParams();
  const [pokemonSpecies, setPokemonSpecies] = useState<
    (PokemonSpecies & { flavorText: string }) | null
  >(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const backgroundColor =
    colorMap[pokemonSpecies?.color?.name || ""] || "#f9f9f9";

  const fetchPokemonData = useCallback(async () => {
    if (!id) return;
    const response = await getPokemonSpecies(id as string);
    setPokemonSpecies(response as PokemonSpecies & { flavorText: string });
    const idNumber = parseInt(id as string);
    const response2 = await getPokemon(idNumber);
    setPokemon(response2 as Pokemon);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (id === "0") return <div>Pokemon no encontrado, prueba con otro</div>;
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
          onMouseEnter={() => playPokemonCry(pokemon)}
        />
      </header>

      <section className={styles.speciesInfo}>
        <div className={styles.containerInfo}>
          <ul className={styles.speciesList}>
            <li>
              <strong>Forma:</strong>{" "}
              {translateShapeToSpanish(pokemonSpecies?.shape?.name)}
            </li>
            <li>
              <strong>Dato General:</strong> {pokemonSpecies?.genera[5]?.genus}
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
