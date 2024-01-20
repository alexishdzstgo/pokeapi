import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserInput from './components/UserInput'
import Pokedex from './components/Pokedex'
import ProtectedRoutes from './components/ProtectecRoutes'
import PokemonDetail from './components/PokemonDetail'
import Loading from './components/Loading'

function App() {

  const [loading, setLoading] = useState(false)

  useEffect (() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    },1000)
  },[])

  return (
   <HashRouter>
    <Routes>
      <Route path="/" element={ <UserInput /> }/>

      <Route element={ loading ? <Loading/> : <ProtectedRoutes/>} >
        <Route path="/pokedex" element= { <Pokedex /> }  />
        <Route path="/pokedex/:name" element={ loading ? <Loading/> : <PokemonDetail /> } />
      </Route>

    </Routes>
   </HashRouter>
  )
}

export default App
