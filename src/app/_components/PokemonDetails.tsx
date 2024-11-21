import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PokemonBase } from '@/services/schema'

interface PokemonDetailsProps {
  pokemon: PokemonBase | undefined
  isLoading: boolean
}

export function PokemonDetails({ pokemon, isLoading }: PokemonDetailsProps) {
  if (isLoading) return <div>Loading...</div>
  if (!pokemon) return <div>Select a Pokémon to see details</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold capitalize">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          {pokemon.sprites.front_default ? (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 mr-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
              <span className="text-2xl font-bold">{pokemon.name[0].toUpperCase()}</span>
            </div>
          )}
          <div>
            <p className="text-lg font-semibold">ID: {pokemon.id}</p>
            <div className="mt-2">
              <p className="font-semibold">Abilities:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {pokemon.abilities.map((ability, index) => (
                  <Badge key={index} variant="secondary">
                    {ability.ability.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

