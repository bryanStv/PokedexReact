import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '../services/PokemonService';

export const usePokemon = (id: number | string) => {
  const pokemonService = new PokemonService();
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => pokemonService.getPokemon(id),
    enabled: !!id, // Solo ejecuta la consulta si el id existe
  });
};
