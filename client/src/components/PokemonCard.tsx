import React, {useRef, useEffect} from "react";
import "../styles/PokemonCard.scss"

interface props {
  name: string,
  sprite: string,
  id: string,
  handleClick: ()=>void,
  observer: IntersectionObserver
}

const PokemonCard:React.FC<props> = (props):JSX.Element => {
  const {name, sprite, id, handleClick, observer} = props;
  const pokemonCard = useRef<HTMLDivElement>(null);
  const imagePokemon = useRef<HTMLImageElement>(null);
  const imageEff = useRef<HTMLImageElement>(null);
  const figure= useRef<HTMLDivElement>(null);

  function animation() {
    if(!(imagePokemon.current && figure.current)) return;
    figure.current.classList.add('disappear');
    imagePokemon.current.classList.add('show');
    imagePokemon.current.classList.remove('invisible');
  }

  function remove():void {
    if(!pokemonCard.current) return;
    pokemonCard.current.remove();
  }

  useEffect(() => {
    if(!imageEff.current) return;
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
          onError={remove}
        />
        <img 
          src={sprite} 
          className="invisible overlay" 
          loading="lazy" 
          ref={imageEff} 
          draggable="false" 
          onAnimationStart={animation} 
          onAnimationEnd={(e):void => e.currentTarget.remove()} 
          onError={remove}
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