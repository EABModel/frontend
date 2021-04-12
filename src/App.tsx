import React from 'react';
import Routes from './components/Routes';
import NavBar from './components/NavBar';

function App() {
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
}

export default App;
