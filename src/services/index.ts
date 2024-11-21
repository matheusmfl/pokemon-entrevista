import { Pokemon } from "./api/pokemon";
import { Endpoint } from "./axios-adapter";

const api = {
  ...new Endpoint(''),
  Pokemon
}

export default api