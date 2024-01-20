import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const PokemonDetail = () => {
    const history = useNavigate();
    const [pokemon, setPokemon] = useState({})
    const { name } = useParams()

    useEffect(() =>{
        axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => setPokemon(res.data))
    },[name])
    /*console.log(pokemon)*/
    return (
        <div  className={`details ${pokemon.types?.[0].type.name}`}>
            <button className='btn'  onClick={()=> history(-1)}><ion-icon name="return-up-back-outline"></ion-icon></button>
            <img className='img-details' src={pokemon.sprites?.other.home.front_default} alt="" />
           <div className='detail'>
                <h1 className='name-pokemon'> {pokemon.name}</h1>
                <h2>#{pokemon.id}</h2>
                    
                <div className='wyh'>
                    <div>
                    <h2>{pokemon.weight}</h2>
                    <p>Weight</p>
                    </div>
                    <div>
                        <h2>{pokemon.height}</h2>
                        <p>Height</p>
                    </div>
                </div>
           </div>
            
        </div>
    );
};

export default PokemonDetail;