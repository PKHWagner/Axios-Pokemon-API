import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // const [pokemon, setPokemon] = useState([]);
  // useEffect(() => {
  //   axios.get('https://pokeapi.co/api/v2/pokemon/?limit=807')
  //     .then(response => {
  //       console.log(response);
  //       setPokemon(response.data.results)
  //     })
  //     .catch(err => console.log(err))
  // }, []);

  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=807');
        const pokemonDataList = await Promise.all(
          response.data.results.map(async (result) => {
            const pokemonResponse = await axios.get(result.url);
            return {
              name: pokemonResponse.data.name,
              image: pokemonResponse.data.sprites.front_default
            };
          })
        );
        setPokemonList(pokemonDataList);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    }

    fetchPokemonList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container width-75% text-center bg-light'>
      <div className='mt-5 bg-dark text-light pb-5'>
        <h1>These are all the Pokemon</h1>
        <h2>Now, Collect them All!</h2>
      </div>
      <hr />
      {pokemonList.map((pokemon) => (
        <div key={pokemon.name} class="d-inline-flex">
          <div>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>

        </div>
      ))}
    </div>
  );
}


//   return (
//     <div className='container width-75% text-center'>
//       <h1>These are all the Pokemon</h1>
//       <h2 className='mb-5'>Now, Collect them All!</h2>
//       <hr />
//       {
//         pokemon.map((pokemon, index) => {
//           return (
//             <div>
//               <p>{pokemon.front_default}</p>
//               <p>{pokemon.name}</p>
//             </div>)
//         })
//       }
//     </div>
//   );
// }

export default App;
