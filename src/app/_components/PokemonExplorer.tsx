'use client'

import { useState, useCallback, useEffect } from 'react'
import usePokemons from '@/hooks/pokemon/usePokemons'
import usePokemon from '@/hooks/pokemon/usePokemon'
import { PokemonList } from './PokemonList'
import { PokemonDetails } from './PokemonDetails'
import { SearchBar } from './SearchBar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { PokemonEntity } from '@/services/api/pokemon/schema'

export function PokemonExplorer() {
  const [offset, setOffset] = useState(0)
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonEntity | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const { data: pokemonList, isLoading: isLoadingList } = usePokemons({
    params: { limit: 20, offset }
  })

  const { data: pokemonDetails, isLoading: isLoadingDetails } = usePokemon({
    pokemonName: selectedPokemon ?? '',
    options: {
      enabled: !!selectedPokemon
    }
  })

  const { data: searchResult, isLoading: isSearching, isSuccess, isError } = usePokemon({
    pokemonName: debouncedSearchTerm,
    options: {
      enabled: !!debouncedSearchTerm,

    },
  })

  useEffect(() => {
    if (isSuccess) {
      setSearchedPokemon(searchResult)
      console.log('SUCCESS: ', searchResult)
      setErrorMessage(null)
    }
    if (isError) {
      setSearchedPokemon(null)
      setErrorMessage("Não encontramos nenhum pokemon com esse nome, refaça suas buscas.")
    }
  }, [isSuccess, isError, searchResult])

  const handlePrevious = () => setOffset(Math.max(0, offset - 20))
  const handleNext = () => setOffset(offset + 20)

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    setOffset(0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokédex</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <PokemonList
            pokemons={pokemonList?.results ?? []}
            searchedPokemon={searchedPokemon}
            isLoading={isLoadingList || isSearching}
            onSelectPokemon={setSelectedPokemon}
            searchTerm={debouncedSearchTerm}
            errorMessage={errorMessage}
          />
          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevious} disabled={offset === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={!pokemonList?.next}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <PokemonDetails pokemon={pokemonDetails} isLoading={isLoadingDetails} />
      </div>
    </div>
  )
}

