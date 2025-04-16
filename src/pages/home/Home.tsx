import PokemonCard from "../../components/ui/cards/PokemonCard";
import { getPokemon } from "../../services/index";
import getRandomPokemonId from "../../utils/functions/pokemon/getRandomPokemonId";

const Home = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>El Pokemon que te toca es:</h1>
      <PokemonCard pokemonData={getPokemon(getRandomPokemonId())} />
    </>
  );
};

export default Home;
