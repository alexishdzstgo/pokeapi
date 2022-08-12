import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonItem from './PokemonItem';

const Pokedex = () => {
    const user = useSelector(state => state.user)
    const [pokemons, setPokemons] = useState([])
    const [namePokemon, setNamePokemon] = useState("")
    const navigate = useNavigate()
    const [typePokemon, setTypePokemon] = useState([])
    

    useEffect(() => {
        //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results))
        axios.get('https://pokeapi.co/api/v2/type')
            .then(res => setTypePokemon(res.data.results) )
    },[]);
    //console.log(pokemons)
    //console.log(typePokemon)
    const search = e => {
        e.preventDefault();
        //alert(namePokemon)
        navigate(`/pokedex/${namePokemon}`)
    }
    const filterPokemons = e =>{
        //alert(e.target.value)
        axios.get(e.target.value)
        //pokeapi.co/api/v2/type/1
        .then(res => setPokemons(res.data.pokemon))
    }
    //console.log(pokemons)
    const [numPage, setNumPage] = useState(1)
    const lastIndex = numPage * 16
    const firstIndex = lastIndex - 16
    const pokemonPaginated = pokemons.slice(firstIndex, lastIndex)
    const [activeSearch, setActiveSearch] = useState(false)

    const lastNumPage = Math.ceil(pokemons.length / 16)
    const numbers = []
    for(let i = 1; i <= lastNumPage; i++) {
        numbers.push(i)
    }
    const active = () => setActiveSearch(!activeSearch)
    const clear = () =>{
        document.getElementById('mysearch').value = ''
    }

    return (
        <div   className='pokedex text-center'>
            <h3>Poquedex</h3>
            <p className='p-text'>Welcome <b>{user}</b>, here you can find your favorite pokemon </p>
                
                <div className='form-search'>
                <form onSubmit={search}>

                    
                    <div className={`search ${activeSearch ? "active" : ""}`}  >
                        <div  className='icon' onClick={active}></div>
                        <div  className='input'>
                            <input type="text" placeholder='Search' id='mysearch' list="pokes" value={namePokemon}
                        onChange={e => setNamePokemon(e.target.value)}/>
                        </div>
                        
                        <span className='clear' onClick={() => clear()}></span>
                    </div>

                </form>
                </div>

            <select name="" id="" onChange={filterPokemons}>
                <option value="">All Pokemons</option>
                {
                    typePokemon.map(typepokemons => (
                        <option key={typepokemons.name} 
                                value={typepokemons.url} 
                        >
                        {typepokemons.name}
                        </option>
                    ))
                    
                }
            </select>
            
                <ul className='ul-card'>
                    {
                        pokemonPaginated.map(pokemon =>(
                            
                            <PokemonItem 
                                    key={pokemon.url ? pokemon.url : pokemon.pokemon.url}  
                                    pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                            />
                        ))
                    }
                </ul>
                
            <button onClick={() => setNumPage(numPage - 1)} disabled={numPage === 1}>Prev</button>
                {
                    numbers.map(pages => (
                        <button key={pages} onClick={() => setNumPage(pages)}>{pages}</button>
                    ))
                }
                <button onClick={() => setNumPage(numPage + 1)} disabled={numPage === lastNumPage}>Next</button>
        </div>
    );

};

export default Pokedex;
