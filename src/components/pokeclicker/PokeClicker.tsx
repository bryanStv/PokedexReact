import style from './PokeClicker.module.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '../../services/PokemonService';
import { Pokemon } from '../../models/Pokemon';
import PokeLoader from '../../components/ui/loader/PokeLoader';

const PokeClicker = () => {
  const pokemonService = new PokemonService();
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [maxHp, setMaxHp] = useState<number>(0);
  const [clickDamage] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [isDefeated, setIsDefeated] = useState<boolean>(false);

  const getRandomPokemonId = () => Math.floor(Math.random() * 1025) + 1;

  const {
    data: currentPokemon,
    isLoading,
    isError,
    refetch,
  } = useQuery<Pokemon>({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const randomId = getRandomPokemonId();
      const pokemon = await pokemonService.getPokemon(randomId);
      if (!pokemon) throw new Error('Pokémon no encontrado');

      const baseHp = pokemon.stats.hp;
      const calculatedHp = Math.floor(baseHp * 1.5);

      // Resetear estados al cargar nuevo Pokémon
      setMaxHp(calculatedHp);
      setCurrentHp(calculatedHp);
      setIsDefeated(false);

      return pokemon;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Resetear estados cuando el componente se monta
  useEffect(() => {
    if (currentPokemon) {
      const baseHp = currentPokemon.stats.hp;
      const calculatedHp = Math.floor(baseHp * 1.5);
      setMaxHp(calculatedHp);
      setCurrentHp(calculatedHp);
      setIsDefeated(false);
    }
  }, [currentPokemon]);

  const handlePokemonClick = () => {
    if (isDefeated || isLoading || !currentPokemon) return;

    const newHp = Math.max(0, currentHp - clickDamage);
    setCurrentHp(newHp);
    setScore((prev) => prev + clickDamage);

    if (newHp <= 0) {
      setIsDefeated(true);
      setTimeout(() => refetch(), 1000);
    }
  };

  const hpBarStyle = {
    width: isDefeated ? '0%' : `${(currentHp / maxHp) * 100}%`,
    backgroundColor: isDefeated
      ? '#ff4444'
      : currentHp < maxHp * 0.2
        ? '#ff4444'
        : currentHp < maxHp * 0.5
          ? '#ffbb33'
          : '#00C851',
  };

  if (isLoading || !currentPokemon) {
    return (
      <div className={style.loadingContainer}>
        <PokeLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={style.loadingContainer}>
        <div>Error al cargar el Pokémon</div>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className={style.pokeClickerContainer}>
      <div className={style.score}>Puntos: {score}</div>

      <div className={style.pokemonContainer} onClick={handlePokemonClick}>
        <img
          src={currentPokemon.image}
          alt={currentPokemon.name}
          className={`${style.pokemonImage} ${isDefeated ? style.fainted : ''}`}
        />

        <div className={style.pokemonInfo}>
          <h2 className={style.pokemonName}>
            {currentPokemon.name} {isDefeated && '(Derrotado!)'}
          </h2>

          <div className={style.hpContainer}>
            <div className={style.hpBar} style={hpBarStyle}></div>
            <span className={style.hpText}>
              {isDefeated ? '0/0' : `HP: ${currentHp}/${maxHp}`}
            </span>
          </div>

          <div className={style.statsContainer}>
            <div>Ataque: {currentPokemon.stats.attack}</div>
            <div>Defensa: {currentPokemon.stats.defense}</div>
          </div>
        </div>
      </div>
      <div className={style.instructions}>
        Haz clic en el Pokémon para atacar. ¡Derrota tantos como puedas!
      </div>
    </div>
  );
};

export default PokeClicker;
