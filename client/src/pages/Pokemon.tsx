import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import { titleCase } from '../utils/helper';

const Pokemon: React.FC = (): JSX.Element => {

  const [info, setInfo] = useState({});

  const {id}:{id:number} = useParams();

  useEffect(() => {
    fetch('/api/pokemon/'+id)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setInfo(data)
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="pokemon" onClick={() => navigate('/')}>
      <h1>{titleCase(info.name)}</h1>
      <img src={info.sprites?.other['official-artwork'].front_default} draggable="false"/>
    </div>
  )
}

export default Pokemon;