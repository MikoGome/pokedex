import React, {useRef, useEffect} from "react";
import "../styles/PokemonCard.scss"

const PokemonCard:React.FC<{name:string, sprite:string, id:string, remove:() => void, handleClick:(id:string)=>void, observer:IntersectionObserver}> = (props):JSX.Element => {
  const {name, sprite, id, remove, handleClick, observer} = props;
  const pokemonCard:React.MutableRefObject<HTMLDivElement> = useRef();
  const image:React.MutableRefObject<HTMLImageElement> = useRef();
  const figure:React.MutableRefObject<HTMLElement> = useRef();

  useEffect(() => {
    observer.observe(image.current);
  }, []);

  return (
    <div className="pokemon-card" id={id} ref={pokemonCard} onClick={handleClick}>
      <div className="pokeball" ref={figure}></div>
      <figure>
        <img src={sprite} className="invisible" loading="lazy" ref={image} draggable="false" onAnimationStart={() => figure.current.classList.add('disappear')} onError={() => remove(pokemonCard.current)}/>
        <figcaption>
          <p>#{id}</p>
          <p>{name}</p>
        </figcaption>
      </figure>
    </div>
  )
};

export default PokemonCard;