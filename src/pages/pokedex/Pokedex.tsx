import style from "./Pokedex.module.css";
import { Fragment, useState, useEffect } from "react";
import PokemonCard from "../../components/ui/cards/PokemonCard";
import { getPokemon } from "../../services/index";
import { Pokemon } from "../../models/interfaces/Pokemon";
import PokeLoader from "../../components/ui/loader/PokeLoader";

const Pokedex = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pokemonsPerPage = 9;

  const [pokemonsData, setPokemonsData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const startId = (currentPage - 1) * pokemonsPerPage + 1;
      const endId = currentPage * pokemonsPerPage;

      const promises: Promise<Pokemon>[] = [];
      for (let i = startId; i <= endId; i++) {
        promises.push(getPokemon(i) as Promise<Pokemon>);
      }

      const results = await Promise.all(promises);
      setPokemonsData(results);
      setLoading(false);
    };

    fetchPokemons();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {loading ? (
        <PokeLoader />
      ) : (
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
      )}
      <div className={style.containerButtons}>
        <button
          className={style.buttonPag}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className={style.pageTag}>Página {currentPage}</span>
        <button className={style.buttonPag} onClick={handleNextPage}>
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Pokedex;
