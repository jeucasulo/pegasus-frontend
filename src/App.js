import React from 'react';

import Checkout from './Views/Checkout/Checkout';
// import Vault from './Views/Vault';
import Vault from './Views/Vault/Vault';
import Dcc from './Views/DCC';
import Header from './Views/Header';
// import Footer from './Views/Footer';

import HostedFields from './Views/HostedFields';
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
          <Route path="/hosted-fields">
            <HostedFields />
          </Route>
        </Switch>
      </div>
      {/* <Footer>
      </Footer> */}
    </Router>
  );
}

export default App;
