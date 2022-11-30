import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';

import "./styles/App.scss"

const App: React.FC = (): JSX.Element => {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pokemon/:id' element={<Pokemon/>}/>
    </Routes>
  )
}

export default App;