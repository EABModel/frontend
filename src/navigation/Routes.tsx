import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import Home from '../screens/Home';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import CompanyLogin from '../screens/CompanyLogin';
import AdministrationPortal from '../screens/AdministrationPortal';
import CallsMenu from '../screens/CallsMenu';
import CatalogMenu from '../screens/CatalogMenu';
import EmployeesMenu from '../screens/EmployeesMenu';
import StoreMenu from '../screens/StoreMenu';

// eslint-disable-next-line react/prop-types
const EmployeeRoute: FC<any> = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (user.sessionType !== 'ANONYMOUS' ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

// eslint-disable-next-line react/prop-types
const AdministratorRoute: FC<any> = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.sessionType === 'ADMINISTRATOR' ? <Component {...props} /> : <Redirect to="/administration" />
      }
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
          <Route path="/" exact component={CompanyLogin} />
          <Route path="/home" exact component={Home} />
          <EmployeeRoute path="/administration" exact component={AdministrationPortal} />
          <EmployeeRoute path="/administration/calls" exact component={CallsMenu} />
          <EmployeeRoute path="/administration/catalog" exact component={CatalogMenu} />
          <EmployeeRoute path="/administration/store" exact component={StoreMenu} />
          <AdministratorRoute path="/administration/employees" exact component={EmployeesMenu} />
        </Switch>
      </Router>
    </div>
  );
};
