import React from 'react';

import Header from './Views/Header';
import Checkout from './Views/Checkout/Checkout';
import Vault from './Views/Vault/Vault';
import Dcc from './Views/DCC'; // not using
import Dropin from './Views/Dropin/Dropin';
import HostedFields from './Views/HostedFields/HostedFields';
import Profile from './Views/Profile';

// import Footer from './Views/Footer';


import './assets/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Header>
      </Header>
      <div>
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/vault">
            <Vault />
          </Route>
          <Route path="/dcc">
            <Dcc />
          </Route>
          <Route path="/dropin">
            <Dropin />
          </Route>
          <Route path="/hosted-fields">
            <HostedFields />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
      {/* <Footer>
      </Footer> */}
    </Router>
  );
}

export default App;
