import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Ec from './Views/EC';
import Vault from './Views/Vault';
import Dcc from './Views/DCC';
import HostedFields from './Views/HostedFields';
import Header from './Views/Header';
// import '../node_modules/material-design-lite/material.min.css';
// import '../node_modules/material-design-lite/material.min.js';
// import '../node_modules/material-design-lite/material.min.js';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Header>
    </Header>


      <div>





         {/* A <Switch> looks through its children <Route>s and
             renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/ec">
            <Ec/>
          </Route>
          <Route path="/vault">
            <Vault/>
          </Route>
          <Route path="/dcc">
            <Dcc />
          </Route>
          <Route path="/hosted-fields">
            <HostedFields />
          </Route>
        </Switch>



      </div>
    </Router>


  );
}

export default App;
