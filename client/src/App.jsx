import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=807')
      .then(response => {
        console.log(response);
        setPokemon(response.data.results)
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <div className='container width-75% text-center'>
      <h1>These are all the Pokemon</h1>
      <h2 className='mb-5'>Now, Collect them All!</h2>
      <hr />
      {
        pokemon.map((pokemon, index) => {
          return (
            <div key={index}>
              <p>{pokemon.name}</p>
              <p>{pokemon.url}</p>
            </div>)
        })
      }
    </div>
  );
}

export default App;
