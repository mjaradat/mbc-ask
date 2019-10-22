import React from 'react';
import "assets/css/bootstrap/css/bootstrap-theme.css"
import "assets/css/bootstrap/css/bootstrap.css"
import "assets/css/reset.css"
import 'assets/css/style.css'
import 'assets/css/media.css'
import 'assets/css/App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from 'routes';
function App() {
  return (
    <div className="App">
        <Router>
          <MainRoutes />
        </Router>
    </div>
  );
}

export default App;
