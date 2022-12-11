import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import Spinner from '../components/Spinner';
import '../styles/Home.scss';

import { titleCase } from '../utils/helper';

interface Pokemon{
  id: string, 
  name: string,
  sprite: string
}

const Home:React.FC = ():JSX.Element => {
  const pokemons = useRef<Pokemon[]>();
  const timeoutID = useRef<ReturnType<typeof setTimeout>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch('/api/pokemons')
      .then(res => res.json())
      .then(data => {
        pokemons.current = data;
        setPokemon(data);
      });

    }, []);

  useEffect(() => {
    setLoading(pokemon.length === 0);
  }, [pokemon])

  useEffect(() => {
    if(!pokemons.current) return;
    clearTimeout(timeoutID.current);
    const noCaseSearch = search.toLowerCase();
    timeoutID.current = setTimeout(() => {
      setPokemon(pokemons.current.filter((el, index):boolean => String(index + 1).startsWith(noCaseSearch) || el.name.startsWith(noCaseSearch)));
    }, 300);
  }, [search])
    
  const navigate: (id:string)=>void = useNavigate();

  const intersectionObserver:React.MutableRefObject<IntersectionObserver> = useRef(
    new IntersectionObserver((entries) => {
      const delay = 100;
      entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('release');
            entry.target.classList.remove('invisible');
          }, index * delay);
          intersectionObserver.current.unobserve(entry.target);
        }
      });
    }, {
      threshold: 1
    }));

  return (
    <div className="home">
      <header>
        <h1>Pokepedia</h1>
        <input value={search} onChange={(e) => setSearch(e.target.value)}/>
      </header>
      <main>
        {loading 
          ? <Spinner />
          : <div id="pokemon-grid">{
              pokemon.map((el, index) => {
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
              })
            }
            </div>
          }
      </main>
    </div>
  )
}

export default Home;