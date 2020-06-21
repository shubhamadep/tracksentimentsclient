import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Components/HomePage'

function App() {
  return (
    <Router>
      <Route exact path = '/' component={HomePage} />
    </Router>
  );
}

export default App;
