import styles from "./Pokemon.module.css";
import { PokemonSpecies, Pokemon } from "../../models/interfaces/Pokemon";
import { getPokemonSpecies, getPokemon } from "../../services/index";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PokeLoader from "../../components/ui/loader/PokeLoader";
import { colorMap } from "../../models/records/ColorMap";
import { translateShapeToSpanish } from "../../utils/functions/pokemon/translateShapeToSpanish";
import StatBar from "../../components/ui/graphics/StatBar";
import { calculateStatPercentage } from "../../utils/functions/pokemon/calculateStatPercentage";

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

  useEffect(() => {
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
  }, [pokemon]);

  if (id === "0") return <div>Pokemon no encontrado, prueba con otro</div>;
  if (loading) return <PokeLoader />;
  if (!pokemonSpecies) return <div>No se encontró la Especie del pokemon</div>;
  if (!pokemon) return <div>No se encontró el pokemon</div>;
  return (
    <div className={styles.pokemonPage} style={{ backgroundColor }}>
      <header className={styles.headerPokemon}>
        <h1 className={styles.pokemonName}>{pokemon.name}</h1>
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
        <img
          className={styles.pokemonImage}
          src={pokemon.image}
          alt={`Imagen del pokemon ${pokemon.name}`}
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
