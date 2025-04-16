import { Fragment } from "react/jsx-runtime";
import PokemonCard from "../../components/ui/cards/PokemonCard";
import { getPokemon } from "../../services/index";
import getRandomPokemonId from "../../utils/functions/pokemon/getRandomPokemonId";

const Home = () => {
  return (
    <>
      {/* <PokemonCard pokemonData={getPokemon(getRandomPokemonId())} /> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Fragment key={i}>
            <PokemonCard pokemonData={getPokemon(i + 1)} />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Home;
