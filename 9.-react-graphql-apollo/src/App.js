import React from 'react';
import './App.css';
import CharactersList from './pages/CharactersList';
import { Route, Switch } from 'react-router-dom';
import Character from './pages/Character';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict exact path="/" component={CharactersList} />
        <Route strict exact path="/search" component={Search} />
        <Route strict exact path="/:id" component={Character} />
      </Switch>
    </div>
  );
}

export default App;
