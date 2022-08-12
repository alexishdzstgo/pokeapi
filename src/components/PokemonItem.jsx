import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const PokemonItem = ( {pokemonUrl} ) => {
    const [pokemon, setPokemon] = useState({})
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(pokemonUrl)
        .then(res => setPokemon(res.data))
    },[])
    console.log(pokemon.types?.[0].type.name)
    return (
        <div className={`card ${pokemon.types?.[0].type.name}`}>
            <div onClick={() => navigate(`/pokedex/${pokemon.name}`)} className="card-pokemon">
                <img src={pokemon.sprites?.other.dream_world.front_default} alt=""  className='img-pokemon'/>

            </div>
        </div>
    );
};

export default PokemonItem;
// pokemon.sprites?.other.dream_world.front_default
// pokemon.sprites?.other.home.front_default