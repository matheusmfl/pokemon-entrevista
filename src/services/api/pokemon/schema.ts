import { pokemonBaseSchema } from '@/services/schema'
import { z } from 'zod'


export const pokemonEntity = z.object({}).merge(pokemonBaseSchema)

export type PokemonEntity = z.infer<typeof pokemonEntity>