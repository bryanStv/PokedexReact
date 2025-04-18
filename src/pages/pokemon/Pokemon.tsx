import styles from "./Pokemon.module.css";
import { PokemonSpecies, Pokemon } from "../../models/interfaces/Pokemon";
import { getPokemonSpecies, getPokemon } from "../../services/index";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PokeLoader from "../../components/ui/loader/PokeLoader";
import { colorMap } from "../../models/records/ColorMap";
import { translateShapeToSpanish } from "../../utils/functions/pokemon/translateShapeToSpanish";
import PokemonStatsBars from "../../components/ui/graphics/PokemonStatsBars";

const PokemonPage = () => {
  const { id } = useParams();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const backgroundColor =
    colorMap[pokemonSpecies?.color?.name || ""] || "#f9f9f9";

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

  const handlePokemonCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play().catch((e) => {
        if (pokemon?.cries?.legacy) {
          const audio2 = new Audio(pokemon.cries.legacy);
          console.warn("Reproduciendo el grito legacy, no hay latest:", e);
          audio2.play().catch((error) => {
            console.warn("Error al reproducir el grito del Pokémon:", error);
          });
        }
      });
    }
  };

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
          onMouseEnter={handlePokemonCry}
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
            {pokemonSpecies?.flavor_text_entries.find(
              (entry) => entry.language.name === "es"
            )?.flavor_text || "No hay descripción en español"}
          </section>
        </div>
      </section>
    </div>
  );
};

export default PokemonPage;
