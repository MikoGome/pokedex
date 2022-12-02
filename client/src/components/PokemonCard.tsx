import React, {useRef, useEffect} from "react";
import "../styles/PokemonCard.scss"

interface props {
  name: string,
  sprite: string,
  id: string,
  handleClick: (id:string)=>void,
  observer: IntersectionObserver
}

const PokemonCard:React.FC<props> = (props):JSX.Element => {
  const {name, sprite, id, handleClick, observer} = props;
  const pokemonCard:React.MutableRefObject<HTMLDivElement> = useRef();
  const imagePokemon:React.MutableRefObject<HTMLImageElement> = useRef();
  const imageEff:React.MutableRefObject<HTMLImageElement> = useRef();

  const figure:React.MutableRefObject<HTMLElement> = useRef();

  function animation() {
    figure.current.classList.add('disappear');
    imagePokemon.current.classList.add('show');
    imagePokemon.current.classList.remove('invisible');
  }

  useEffect(() => {
    observer.observe(imageEff.current);
  }, []);

  return (
    <div className="pokemon-card" id={id} ref={pokemonCard} onClick={handleClick}>
      <div className="pokeball" ref={figure}></div>
      <figure>
        <img 
          src={sprite} 
          className="invisible" 
          loading="lazy" 
          ref={imagePokemon} 
          draggable="false" 
          onError={():void => pokemonCard.current.remove()}
        />
        <img 
          src={sprite} 
          className="invisible overlay" 
          loading="lazy" 
          ref={imageEff} 
          draggable="false" 
          onAnimationStart={animation} 
          onAnimationEnd={(e):void => e.target.remove()} 
          onError={():void => pokemonCard.current.remove()}
        />
        <figcaption>
          <p>#{id}</p>
          <p>{name}</p>
        </figcaption>
      </figure>
    </div>
  )
};

export default PokemonCard;