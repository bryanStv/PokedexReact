import StatBar from './StatBar';
import { Pokemon } from '../../../models/Pokemon';
import { PokemonUtils } from '../../../utils/PokemonUtils';

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
        percentage={PokemonUtils.calculateStatPercentage(
          pokemon.stats.hp,
          'hp'
        )}
      />
      <StatBar
        label="Ataque"
        value={pokemon.stats.attack}
        percentage={PokemonUtils.calculateStatPercentage(
          pokemon.stats.attack,
          'attack'
        )}
      />
      <StatBar
        label="Defensa"
        value={pokemon.stats.defense}
        percentage={PokemonUtils.calculateStatPercentage(
          pokemon.stats.defense,
          'defense'
        )}
      />
      <StatBar
        label="Sp.Atk"
        value={pokemon.stats.specialAttack}
        percentage={PokemonUtils.calculateStatPercentage(
          pokemon.stats.specialAttack,
          'specialAttack'
        )}
      />
      <StatBar
        label="Sp.Def"
        value={pokemon.stats.specialDefense}
        percentage={PokemonUtils.calculateStatPercentage(
          pokemon.stats.specialDefense,
          'specialDefense'
        )}
      />
      <StatBar
        label="Velocidad"
        value={pokemon.stats.speed}
        percentage={PokemonUtils.calculateStatPercentage(
          pokemon.stats.speed,
          'speed'
        )}
      />
    </>
  );
};

export default PokemonStatsBars;
