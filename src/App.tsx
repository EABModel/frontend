import React, { FC } from 'react';
import { Routes } from './components/Routes';
import './App.css';

export const App: FC = () => {
  return (
    <div className="container">
      <div className="App">
        <Routes />
      </div>
    </div>
  );
};
