import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import '../styles/Home.scss';

import { titleCase } from '../utils/helper';

const Home:React.FC = ():JSX.Element => {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    if(pokemon.length) return;
    fetch('/api/pokemons')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPokemon(data)
      });

    }, []);
    
  const navigate: (id:string)=>void = useNavigate();

  const {current: observer}:{current:IntersectionObserver} = useRef(new IntersectionObserver((entries) => {
    const delay = 100;
    entries.forEach((entry, index) => {
      if(entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('release');
          entry.target.classList.remove('invisible');
        }, index * delay);
        observer.unobserve(entry.target);
      }
    })
  }, {
    threshold: 1
  }));

  const pokemonCard = pokemon.map((el, index) => {
    const {name, id, sprite}:{name:string, id:string, sprite:string} = el;
    return (
      <PokemonCard 
        key={"pokemon_card_"+index} 
        name={titleCase(name)} 
        id={id} 
        sprite={sprite} 
        remove={remove} 
        handleClick={():void => navigate('pokemon/'+id)}
        observer={observer}
      />
    )
  });



  function remove(target:HTMLDivElement):void {
    target.remove();
  }

  return (
    <div className="home">
      <h1>Pokedex</h1>
      <div id="pokemon-grid">
        {pokemonCard}
      </div>
    </div>
  )
}

export default Home;