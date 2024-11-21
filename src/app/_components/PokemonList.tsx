import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { PokemonListResponse } from '@/services/schema'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { PokemonEntity } from '@/services/api/pokemon/schema'

interface PokemonListProps {
  pokemons: PokemonListResponse['results']
  searchedPokemon: PokemonEntity | null
  isLoading: boolean
  onSelectPokemon: (name: string) => void
  searchTerm: string
  errorMessage: string | null
}

export function PokemonList({ pokemons, isLoading, onSelectPokemon, searchTerm, searchedPokemon, errorMessage }: PokemonListProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const listRef = useRef<HTMLDivElement>(null)

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => {
          const newIndex = e.key === 'ArrowUp'
            ? Math.max(0, prev - 1)
            : Math.min(filteredPokemons.length - 1, prev + 1)
          const element = listRef.current?.children[newIndex] as HTMLElement
          element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          return newIndex
        })
      } else if (e.key === 'Enter' && selectedIndex !== -1 && filteredPokemons[selectedIndex]) {
        onSelectPokemon(filteredPokemons[selectedIndex].name)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredPokemons, selectedIndex, onSelectPokemon])

  if (isLoading) return <div>Loading...</div>

  if (errorMessage) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    )
  }

  if (searchTerm && searchedPokemon) {
    return (
      <Card
        className="cursor-pointer transition-colors"
        onClick={() => onSelectPokemon(searchedPokemon.name)}
      >
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold capitalize">{searchedPokemon.name}</h2>
        </CardContent>
      </Card>
    )
  }

  if (searchTerm && !searchedPokemon) return <div>No Pokémon found</div>

  return (
    <div ref={listRef} className="space-y-2 max-h-[60vh] overflow-y-auto">
      {filteredPokemons.map((pokemon, index) => (
        <Card
          key={pokemon.name}
          className={`cursor-pointer transition-colors ${index === selectedIndex ? 'ring-2 ring-primary' : ''
            }`}
          onClick={() => onSelectPokemon(pokemon.name)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

