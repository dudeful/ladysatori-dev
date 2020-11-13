import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Aulas from './components/Aulas';
import Sobre from './components/Sobre';

function App() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/blog' component={Blog} exact />
            <Route path='/aulas-yoga' component={Aulas} exact />
            <Route path='/sobre' component={Sobre} exact />
          </Switch>
        </Router>
      </div>
    )};

export default App;

