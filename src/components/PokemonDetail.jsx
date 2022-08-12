import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState({})
    const { name } = useParams()

    useEffect(() =>{
        axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => setPokemon(res.data))
    },[name])
    console.log(pokemon)
    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites?.other.home.front_default} alt="" />
        </div>
    );
};

export default PokemonDetail;