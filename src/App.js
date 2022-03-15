// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Navbar from './component/Navbar';
import Todos from './component/Todos';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Todos />
    </div>
  );
}

export default App;
