import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

import lightTheme from './theme/muiTheme'
import HomePage from './Components/HomePage'

function App() {
  return (
    <MuiThemeProvider theme={lightTheme}>
      <Router>
        <Route exact path = '/' component={HomePage} />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
