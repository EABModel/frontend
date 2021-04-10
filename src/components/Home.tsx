import React from 'react';
import logo from '../logo.svg';
import { Counter } from '../features/counter/Counter';
import { useHistory } from "react-router-dom";
import '../App.css';

function Home() {
  const history = useHistory();

  const goToAboutPage = () => {
    history.push('/about');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />       
      </header>
      <button type="button" onClick={goToAboutPage}>
        About
      </button>
    </div>
  );
}

export default Home;