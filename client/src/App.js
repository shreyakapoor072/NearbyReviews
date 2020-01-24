/* eslint no-undef: 0 */

import React from 'react';
import './App.css';
import { RouteHandler } from './RouteHandler';
import { BrowserRouter as Router } from 'react-router-dom';
const Socket = io('http://localhost:5000');
window.Socket = Socket;


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
