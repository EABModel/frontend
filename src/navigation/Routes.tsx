import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import Home from '../screens/Home';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import CompanyAuth from '../screens/CompanyAuth';
import AdministrationPortal from '../screens/AdministrationPortal';
import CallsMenu from '../screens/CallsMenu';
import CatalogueMenu from '../screens/CatalogueMenu';
import EmployeesMenu from '../screens/EmployeesMenu';
import ShopMenu from '../screens/ShopMenu';
import ProductDetails from '../screens/ProductDetails';
import CustomerCallScreen from '../screens/CustomerCallScreen';

// eslint-disable-next-line react/prop-types
const EmployeeRoute: FC<any> = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (user.sessionType !== 'ANONYMOUS' ? <Component {...props} /> : <Redirect to="/home" />)}
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
          <Route path="/" exact component={CompanyAuth} />
          <Route path="/home" exact component={Home} />
          <Route path="/home/call" exact component={CustomerCallScreen} />
          <Route path="/product/:id/details" exact component={ProductDetails} />
          <EmployeeRoute path="/administration" exact component={AdministrationPortal} />
          <EmployeeRoute path="/administration/calls" exact component={CallsMenu} />
          <EmployeeRoute path="/administration/catalogue" exact component={CatalogueMenu} />
          <EmployeeRoute path="/administration/shop" exact component={ShopMenu} />
          <AdministratorRoute path="/administration/employees" exact component={EmployeesMenu} />
        </Switch>
      </Router>
    </div>
  );
};
