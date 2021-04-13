import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';


export const Routes: FC = () => {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
        </Switch>
      </Router>
    </div>
  );
};
