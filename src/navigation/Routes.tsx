import React, { FC, useState } from 'react';
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
import { IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../styles/css/layout.scss';
import SidebarOptions from './SidebarOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

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

const Routes: FC = () => {
  const styles = useStyles();
  const [leftOpen, setLeftOpen] = useState(false);
  const [isOpen, setOpen] = useState(leftOpen ? 'open' : 'closed');
  const toggleSidebar = () => {
    setLeftOpen(!leftOpen);
    setOpen(leftOpen ? 'open' : 'closed');
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div id="layout">
        <div id="left" className={isOpen}>
          <IconButton
            edge="start"
            className={`icon ${styles.menuButton}`}
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <div className={`sidebar ${isOpen}`}>
            <div className="content">
              <SidebarOptions />
            </div>
          </div>
        </div>
        <div id="main">
          <div className="header">
            <div
              className={`
                          title
                          ${'left-' + isOpen}
                      `}>
              <NavBar />
            </div>
          </div>
          <div className="content" id="page">
            <Switch>
              <Route path="/" exact component={CompanyAuth} />
              <Route path="/home" exact component={Home} />
              <EmployeeRoute path="/administration" exact component={AdministrationPortal} />
              <EmployeeRoute path="/administration/calls" exact component={CallsMenu} />
              <EmployeeRoute path="/administration/catalogue" exact component={CatalogueMenu} />
              <EmployeeRoute path="/administration/shop" exact component={ShopMenu} />
              <AdministratorRoute path="/administration/employees" exact component={EmployeesMenu} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
