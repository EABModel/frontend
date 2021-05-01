import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';
import { AuthState } from '../redux/types/AuthTypes';
import Home from './Home';
import { About } from './About';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';


const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  const auth = useSelector<RootState, AuthState>(state => state.auth);
  return (
    <Route {...rest} render={(props) => (
      auth.sessionType !== 'ANONYMOUS'
      ? <Component {...props} />
      : <Redirect to='/' />
    )} />
  )
};

export const Routes: FC = () => {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/about' exact component={About} />
        </Switch>
      </Router>
    </div>
  );
};
