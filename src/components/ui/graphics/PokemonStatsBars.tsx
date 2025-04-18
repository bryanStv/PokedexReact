import { calculateStatPercentage } from "../../../utils/functions/pokemon/calculateStatPercentage";
import StatBar from "./StatBar";
import { Pokemon } from "../../../models/interfaces/Pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonStatsBars = (props: Props) => {
  const { pokemon } = props;
  return (
    <>
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
    </>
  );
};

export default PokemonStatsBars;
