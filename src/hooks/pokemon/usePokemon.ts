// #Package
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

// #Project
import { PokemonEntity } from '@/services/api/pokemon/schema'
import api from '@/services'

export const POKEMON = 'POKEMON'

type UsePokemonQueryArgs = {
  pokemonId?: PokemonEntity['id']
  pokemonName: PokemonEntity['name']
  options?: Omit<UseQueryOptions<PokemonEntity, Error, PokemonEntity, ['POKEMON', string]>, 'queryKey' | 'queryFn'>
}

function usePokemon({ pokemonId, pokemonName, options }: UsePokemonQueryArgs) {
  const queryFn = async () => {
    if (!pokemonId && !pokemonName) {
      throw new Error('Either pokemonId or pokemonName must be provided')
    }

    const response = await api.Pokemon.findOne({ id: pokemonId, name: pokemonName })

    return response
  }

  return useQuery<PokemonEntity, Error, PokemonEntity, ['POKEMON', string]>({
    queryKey: [POKEMON, pokemonName],
    queryFn,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true,
    ...options,
  })
}

export default usePokemon

