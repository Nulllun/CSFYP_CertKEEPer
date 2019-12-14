import React from 'react';
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import MyNavbar from './components/Navbar/Navbar.js';
import CertVerifier from './components/Verify/CertVerifier.js';
import CertIssuer from './components/Issue/CertIssuer.js';
import CertViewer from './components/View/CertViewer.js';
import CertSharer from './components/Share/CertSharer.js';


const hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Router history={hist}>
        <Switch>
          <Route path="/verify" component={CertVerifier} />
          <Route path="/issue" component={CertIssuer} />
          <Route path="/view" component={CertViewer} />
          <Route path="/share" component={CertSharer} />
          {/* <Redirect from="/" to="/" /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
