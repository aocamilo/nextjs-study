import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "./components/layout";
import { usePokemonData } from "./hooks/usePokemonData";

interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export const loader = ({ src, width, quality }: LoaderProps) =>
  `${src}?w=${width}&q=${quality || 75}`;

/* 
  CSR (CLient Side Rendering)
  Next Build -> Generate Static HTML parts -> Fetch Data -> Populate the remaining HTML parts that depend on external data.
  Use this for pages that do not require SEO and are dependant on updated data.
*/

export interface PokemonAbility {
  ability: {
    name: {};
  };
}

export interface Pokemon {
  name: string;
  weight: string;
  sprites: {
    front_default: string;
  };
  abilities: PokemonAbility[];
}

export interface BasicPokemon {
  url: string;
}

const pokemon = () => {
  const [page, setPage] = useState(0);
  const { pokemones, loading } = usePokemonData(page);

  if (pokemones.length === 0 || loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="container-fluid d-flex row align-items-center justify-content-center">
        <Head>
          <title>Pokedexapp - CSR</title>
        </Head>
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
          }
        />
        <h1 className="p-5">Pokedex</h1>
        {pokemones.map((pokemon: Pokemon) => (
          <div
            className="card d-flex col-3"
            key={pokemon.name}
            data-cy="pokemon-card"
          >
            <Image
              loader={loader}
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
              layout="fixed"
            />
            <h2> {pokemon.name} </h2>
            <p>weight: {pokemon.weight}</p>
            <div className="d-flex flex-row m-2">
              {pokemon.abilities.map((ability: PokemonAbility) => (
                <span
                  className="badge bg-success me-1"
                  key={`${pokemon.name}-${ability.ability.name}`}
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        <ul className="pagination justify-content-center p-5">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => setPage(Math.max(0, page - 1))}
            >
              Previous
            </a>
          </li>
          <li className="page-item disabled">
            <a className="page-link active" aria-current="page">
              {page + 1}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => setPage(page + 2)}>
              {page + 2}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => setPage(page + 3)}>
              {page + 3}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default pokemon;
