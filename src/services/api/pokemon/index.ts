import { Endpoint } from "@/services/axios-adapter"
import { PaginationParams, PokemonListResponse } from "@/services/schema"
import { PokemonEntity } from "./schema"

type IFindOneParams = {
  id?: PokemonEntity['id'],
  name?: PokemonEntity['name']
}

class PokemonEndpoint extends Endpoint {
	find = (params: PaginationParams): Promise<PokemonListResponse> =>
		this.get('', {
			params,
		})
	findOne = ({id, name}:IFindOneParams): Promise<PokemonEntity> => this.get(`/${id ?? name}`)
	
}

export const Pokemon = new PokemonEndpoint('/pokemon')