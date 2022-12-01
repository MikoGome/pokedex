import React, {useRef, useEffect} from "react";
import "../styles/PokemonCard.scss"

const PokemonCard:React.FC<{name:string, sprite:string, id:string, remove:() => void, handleClick:(id:string)=>void, observer:IntersectionObserver}> = (props):JSX.Element => {
  const {name, sprite, id, remove, handleClick, observer} = props;
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
        <img src={sprite} className="invisible" loading="lazy" ref={imagePokemon} draggable="false" onError={() => remove(pokemonCard.current)}/>
        <img src={sprite} className="invisible overlay" loading="lazy" ref={imageEff} draggable="false" onAnimationStart={animation} onAnimationEnd={(e) => remove(e.target)} onError={() => remove(pokemonCard.current)}/>
        <figcaption>
          <p>#{id}</p>
          <p>{name}</p>
        </figcaption>
      </figure>
    </div>
  )
};

export default PokemonCard;