import { z } from 'zod'

export const apiResponseSchema = z.object({
	message: z.string(),
})

export const paginationParamsSchema = z.object({
  offset: z.number().min(0).default(0),
  limit: z.number().min(1).max(100).default(20),
});


export type PaginationParams = z.infer<typeof paginationParamsSchema>;


export const pokemonAbilitySchema = z.object({
  ability: z.object({
    name: z.string(), 
    url: z.string().url(),
  }),
  is_hidden: z.boolean(), 
  slot: z.number(), 
});


export const pokemonSpritesSchema = z.object({
  front_default: z.string().url().nullable(), 
});


export const pokemonBaseSchema = z.object({
  id: z.number(), 
  name: z.string(), 
  sprites: pokemonSpritesSchema, 
  abilities: z.array(pokemonAbilitySchema),
});


export type PokemonBase = z.infer<typeof pokemonBaseSchema>;

export class ErrorResponse {
	statusCode: string
	message: string
	code: string
	timestamp: string
	path: string
	method: string

	constructor(data: ErrorResponse) {
		this.statusCode = data.statusCode
		this.message = data.message
		this.code = data.code
		this.timestamp = data.timestamp
		this.path = data.path
		this.method = data.method
	}
}

export type ApiErrorResponse = z.infer<typeof apiResponseSchema> & ErrorResponse

export const pokemonListItemSchema = z.object({
  name: z.string(), 
  url: z.string().url(), 
});


export const pokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(pokemonListItemSchema),
});


export type PokemonListResponse = z.infer<typeof pokemonListResponseSchema>;