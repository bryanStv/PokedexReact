import style from "./Pokedex.module.css";
import { Fragment, useState, useEffect } from "react";
import PokemonCard from "../../components/ui/cards/PokemonCard";
import { getPokemon } from "../../services/index";
import { Pokemon } from "../../models/interfaces/Pokemon";
import PokeLoader from "../../components/ui/loader/PokeLoader";

const Pokedex = () => {
  const [startId, setStartId] = useState<number>(1);
  const pokemonsPerPage = 9;

  const [pokemonsData, setPokemonsData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);

      const endId = startId + pokemonsPerPage - 1;

      const promises: Promise<Pokemon | undefined>[] = [];
      for (let i = startId; i <= endId; i++) {
        promises.push(getPokemon(i));
      }

      const results = await Promise.all(promises);
      const filteredResults = results.filter(
        (p): p is Pokemon => p !== undefined
      );
      setPokemonsData(filteredResults);
      setLoading(false);
    };

    fetchPokemons();
  }, [startId]);

  const handleNextPage = () => {
    if (startId < 1023) {
      setStartId((prev) => prev + pokemonsPerPage);
    }
  };

  const handlePrevPage = () => {
    if (startId > 1) {
      setStartId((prev) => prev - pokemonsPerPage);
    }
  };

  const handleChangeGeneration = (generation: number) => {
    setStartId(generation);
  };

  return (
    <>
      {loading ? (
        <PokeLoader />
      ) : (
        <>
          <div className={style.buttonGroup}>
            {[
              { label: "Gen I", id: 1 },
              { label: "Gen II", id: 152 },
              { label: "Gen III", id: 252 },
              { label: "Gen IV", id: 387 },
              { label: "Gen V", id: 494 },
              { label: "Gen VI", id: 650 },
              { label: "Gen VII", id: 722 },
              { label: "Gen VIII", id: 810 },
              { label: "Gen IX", id: 906 },
            ].map(({ label, id }) => (
              <button
                key={label}
                className={style.genButton}
                onClick={() => handleChangeGeneration(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {pokemonsData.map((pokemonData) => (
              <Fragment key={pokemonData.id}>
                <PokemonCard pokemonData={pokemonData as Pokemon} />
              </Fragment>
            ))}
          </div>
        </>
      )}
      <div className={style.containerButtons}>
        <button
          className={style.genButton}
          onClick={handlePrevPage}
          disabled={startId === 1}
        >
          Anterior
        </button>
        <span className={style.pageTag}>
          {startId} al {startId + pokemonsPerPage - 1}
        </span>
        <button
          className={style.genButton}
          onClick={handleNextPage}
          disabled={startId === 1023}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Pokedex;
