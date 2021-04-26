import React, { FC } from 'react';
import { Routes } from './components/Routes';
import NavBar from './components/NavBar';

export const App: FC = () => {
  return (
    <div className="container">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="App">
        <Routes />
      </div>
    </div>
  );
};
