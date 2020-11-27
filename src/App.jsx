import React from 'react';
import './App.css'
import {
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import { Characters } from './components/Characters/Characters';
import { Episodes } from './components/Episodes/Episodes';
import { Locations } from './components/Locations/Locations';
import { WatchList } from './components/WatchList/WatchList';

const App = () => (
  <div className="App">
    <nav className="menu">
      <NavLink to="/characters" className="normal" activeClassName="active" exact>Characters</NavLink>
      <NavLink to="/episodes" className="normal" activeClassName="active" exact>Episodes</NavLink>
      <NavLink to="/locations" className="normal" activeClassName="active" exact>Locations</NavLink>
      <NavLink to="/watch-list" className="normal" activeClassName="active" exact>Watch List</NavLink>
    </nav>

    <Switch>
      <Route path="/" exact component={Characters} />
      <Route path="/characters" exact component={Characters} />
      <Route path="/episodes" exact component={Episodes} />
      <Route path="/locations" exact component={Locations} />
      <Route path="/watch-list" exact component={WatchList} />
    </Switch>

  </div>
);

export default App;