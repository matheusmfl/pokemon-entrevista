// #Package
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

// #Project


import api from '@/services'
import { PaginationParams, PokemonListResponse } from '@/services/schema'


export const POKEMONS = 'POKEMONS'

type UsePokemonsQueryArgs = {
  params: PaginationParams
  options?: Partial<UseQueryOptions<unknown, Error, PokemonListResponse, [typeof POKEMONS, string]>>
}

function usePokemons({ params, options }: UsePokemonsQueryArgs) {
  const queryFn = async () => {
    const response = await api.Pokemon.find(params)

    return response
  }

  return useQuery({
    queryKey: [POKEMONS, JSON.stringify(params)],
    queryFn,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export default usePokemons