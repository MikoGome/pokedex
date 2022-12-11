import React from 'react';
import {Routes, Route} from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const Pokemon = React.lazy(() => import('./pages/Pokemon'));

import Spinner from './components/Spinner';

import "./styles/App.scss"

const App: React.FC = ():JSX.Element => {

  return (
    <React.Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pokemon/:id' element={<Pokemon/>}/>
      </Routes>
    </React.Suspense>
  )
}

export default App;