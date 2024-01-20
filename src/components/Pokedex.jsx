import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonItem from './PokemonItem';

const Pokedex = () => {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () =>{
        if (theme === 'light') {
            setTheme('darkk')
        }else {
            setTheme('light')
        }
    }

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
    const [numPage, setNumPage] = useState(1)
    const lastIndex = numPage * 16
    const firstIndex = lastIndex - 16
    const pokemonPaginated = pokemons.slice(firstIndex, lastIndex)
    const [activeSearch, setActiveSearch] = useState(false)

    const lastNumPage = Math.ceil(pokemons.length / 16) //de 1000 a 73 reg.

    const numbers = []
    for(let i = 1; i <= lastNumPage; i++) {
        numbers.push(i)
    }
    //
    
    let numPageFinish = numPage + 10
    let numPageInit = numPageFinish - 10
    let numbersPaginated = numbers.slice(numPage -1, numPageFinish)
    if (numPage > 4){
        numPageFinish = numPage + 5
        numPageInit = numPageFinish - 10
        numbersPaginated = numbers.slice(numPageInit , numPageFinish)
    }
    //
    const active = () => setActiveSearch(!activeSearch)
    const clear = () =>{
        document.getElementById('mysearch').value = ''
    }

    return (
        
        <div   className={`${theme} text-center`}>

            <h3>Poquedex</h3>
            <div className='toggle'>
            <input 
                className='ocultar' 
                type="checkbox"  
                id="darkmode-toggle"
                onChange={toggleTheme}
            />
            <label htmlFor="darkmode-toggle" />
            </div>

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
                
                <button className={numPage === 1 ? 'inactive' : 'activebtn'} onClick={() => setNumPage(numPage - 1)} disabled={numPage === 1}>Prev</button>
                {
                    numbersPaginated.map(pages  => (
                        <button className={pages == numPage ? 'activebtn' : 'disabled'} key={pages} onClick={() => setNumPage(pages)}>{pages}</button>
                    ))
                }
                <button className={numPage === lastNumPage ? 'inactive' : 'activebtn'} onClick={() => setNumPage(numPage + 1)} disabled={numPage === lastNumPage}>Next</button>
        </div>
    );

};

export default Pokedex;
