import Head from "next/head";
import Image from "next/image";
import { loader } from "./pokemon";
import { useCallback, useState } from "react";

/*
  SSG only works on server-side and at build time, it can work either using external data or static data.
  if the pages requires external data it fetches the data and passes it as prop to the component. 
  It must be exported in the same page doc, like shown below. 
  Without data: Next Build -> HTML Generated
  With data: Next Build -> Fetch External Data -> HTML Generated
  Works like SSR in dev environment.

  getStaticProps: used to fetch external data, only runs server-side and works only at build time
  getStaticPaths: must be used with getStatic props, cannot be used with getServerSideProps, 
                  used if a page has Dynamic Routes to define a list of paths to be statically generated.

  note: Use only if the data does not change much and only initial fetch is required. CMS, Blog Posts, etc.
*/
// export async function getStaticProps() {
//   const res = await fetch('https://rickandmortyapi.com/api/character');
//   const characters = await res.json();

//   return {
//     props: {
//       characters: characters.results
//     }
//   }

// }

/* 
  SSR used when we need to fetch data at request time instead build time
  context parameter contains request specific parameters
  Page Request -> Next Build -> Fetch External Data -> HTML Generated.
  Optimal for SEO
  getServerSideProps: Runs at server-side only and is used at EVERY page request
*/

export async function getServerSideProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const characters = await res.json();

  console.log(characters);

  if (characters.error) {
    return {
      props: {
        error: characters.error,
      },
    };
  }

  return {
    props: {
      characters: characters.results,
      next: characters.info.next,
    },
  };
}

export interface Character {
  name: string;
  image: string;
  id: number;
  gender: string;
  species: string;
  status: string;
}

interface Characters {
  characters: Character[];
  error?: string;
  next?: string;
}

const RickAndMorty = ({ characters, error, next }: Characters) => {
  const [filter, setFilter] = useState("");
  const [filteredChars, setFilteredChars] = useState(characters);
  const [runError, setRunError] = useState(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());

    if (event.target.value === "") {
      setFilteredChars(characters);
      return;
    }

    setFilteredChars(filterChars(filter));
  };

  const filterChars = useCallback(
    (f: string) => {
      return characters.filter((char) => char.name.toLowerCase().includes(f));
    },
    [filter]
  );

  const onResetFilter = () => {
    setFilteredChars(characters);
    setFilter("");
  };

  const onNextPage = async () => {
    console.log("called");

    if (next) {
      const res = await fetch(next);
      const resp = await res.json();

      if (resp.error) {
        setRunError(resp.error);
        return;
      }
    }
  };

  if (error || runError) return <>{error ?? runError}</>;

  if (!characters || characters.length === 0) return <>Loading...</>;

  return (
    <div className="container-fluid d-flex row align-items-center justify-content-center">
      <Head>
        <title>Rick And Morty - SSR / SSG</title>
      </Head>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <input
          type="text"
          name="search"
          data-testid="filter-input-name"
          placeholder="Search Char"
          value={filter}
          onChange={onInputChange}
          style={{ position: "absolute", top: 70, width: "20%" }}
        />
        <button
          name="reset-filter"
          data-testid="reset-filter"
          onClick={onResetFilter}
          style={{
            marginTop: 50,
            position: "relative",
            top: 0,
            width: "20%",
          }}
        >
          Reset Filter
        </button>
        {next && (
          <button
            data-testid="fetch-next-page"
            name="fetch-more"
            onClick={onNextPage}
            style={{
              marginTop: 50,
              position: "relative",
              top: 0,
              width: "20%",
            }}
          >
            Fetch more
          </button>
        )}
      </div>

      {filteredChars.map(
        ({ name, image, id, gender, species, status }: Character) => (
          <div
            className="card d-flex col-3"
            key={`${id}-${name}`}
            style={{ marginTop: 10 }}
            data-testid="character"
          >
            <h2> {name} </h2>
            <Image
              loader={loader}
              src={image}
              alt={name}
              width={300}
              height={300}
              layout="fixed"
            />
            <p className="mt-5 mb-0 p-0">Gender: {gender}</p>
            <p className="m-0 p-0">Species: {species}</p>
            <p>Status: {status}</p>
          </div>
        )
      )}
    </div>
  );
};

export default RickAndMorty;
