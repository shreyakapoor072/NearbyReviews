import React from 'react';
import './App.css';
import { RouteHandler } from './RouteHandler';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="nearbuyCont">
      <Router>
        <RouteHandler  />
      </Router>
    </div>
  );
}

export default App;
