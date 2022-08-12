import reactLogo from './assets/react.svg'
import './App.css'
import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserInput from './components/UserInput'
import Pokedex from './components/Pokedex'
import ProtectedRoutes from './components/ProtectecRoutes'
import PokemonDetail from './components/PokemonDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
   <HashRouter>
    <Routes>
      <Route path="/" element={ <UserInput /> }/>

      <Route element={<ProtectedRoutes/>} >
        <Route path="/pokedex" element= { <Pokedex /> }  />
        <Route path="/pokedex/:name" element={ <PokemonDetail /> } />
      </Route>

    </Routes>
   </HashRouter>
  )
}

export default App
