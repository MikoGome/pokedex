import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import '../styles/Home.scss';

import { titleCase } from '../utils/helper';

const Home:React.FC = ():JSX.Element => {
  const pokemons = useRef();
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/pokemons')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        pokemons.current = data;
        setPokemon(data);
      });

    }, []);

  useEffect(() => {
    if(!pokemons.current) return;
    setPokemon(pokemons.current.filter((el, index):boolean => String(index + 1).startsWith(search) || el.name.startsWith(search.toLowerCase())));
  }, [search])
    
  const navigate: (id:string)=>void = useNavigate();

  const intersectionObserver:React.MutableRefObject<IntersectionObserver> = useRef(new IntersectionObserver((entries) => {
    const delay = 100;
    entries.forEach((entry, index) => {
      if(entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('release');
          entry.target.classList.remove('invisible');
        }, index * delay);
        intersectionObserver.current.unobserve(entry.target);
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
        handleClick={():void => navigate('pokemon/'+id)}
        observer={intersectionObserver.current}
      />
    )
  });

  return (
    <div className="home">
      <h1>Pokepedia</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)}/>
      <div id="pokemon-grid">
        {pokemonCard}
      </div>
    </div>
  )
}

export default Home;