import React from 'react';
import Vault from './Views/Vault';
import Dcc from './Views/DCC';
import Header from './Views/Header';
// import Footer from './Views/Footer';
import Ec from './Views/EC';
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
      {/* <Footer>
      </Footer> */}
    </Router>
  );
}

export default App;
