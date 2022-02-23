import { useEffect, useState } from "react";
import { Pokemon, BasicPokemon } from '../pokemon';


export const usePokemonData = (page: number) => {

  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const defaultLimit = 20;

  useEffect(() => {

    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${defaultLimit}&offset=${defaultLimit * page}`

    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        Promise.all(json.results.map(async (pokemon: BasicPokemon) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        })).then(res => {
          setPokemones(res);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchPokemon();

  }, [page])

  return { pokemones, loading };
}
