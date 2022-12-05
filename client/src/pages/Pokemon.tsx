import React, {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import { titleCase } from '../utils/helper';

const Pokemon: React.FC = (): JSX.Element => {

  const [info, setInfo] = useState({});
  const {id}:{id:number} = useParams();
  const pokemonCry = useRef<()=>void>(
    (function cry(id):()=>void {
      const audio = new Audio(`https://pokemoncries.com/cries/${id}.mp3`);
      return () => audio.play();
    })(id)
  );

  useEffect(() => {
    fetch('/api/pokemon/'+id)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setInfo(data)
    });
  }, []);

  useEffect(() => {
    pokemonCry.current();
  }, [info])

  const navigate = useNavigate();

  return (
    <div className="pokemon">
      <h1>{titleCase(info.name)}</h1>
      <img src={info.sprites?.other['official-artwork'].front_default} draggable="false" onClick={pokemonCry.current}/>
    </div>
  )
}

export default Pokemon;