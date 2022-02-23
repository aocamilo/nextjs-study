
export const getPokemon = async (url: string) => { 
    try {
      const response = await fetch(url);
      const json = await response.json();

      Promise.all(
        json.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        })
      ).then((res) => res);
    } catch (error) {
      console.error(error);
      return null;
    }
}