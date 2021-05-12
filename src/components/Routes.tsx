import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import Home from './Home';
import AdministrationPortal from './AdministrationPortal';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (user.sessionType !== 'ANONYMOUS' ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export const Routes: FC = () => {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/administration" exact component={AdministrationPortal} />
        </Switch>
      </Router>
    </div>
  );
};
