import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import MyNavbar from './components/Navbar/Navbar.js';
import CertViewer from './components/View/CertViewer.js';


const hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Router history={hist}>
        <Switch>
          <Route path="/verify" component={MyNavbar} />
          <Route path="/issue" component={MyNavbar} />
          <Route path="/view" component={CertViewer} />
          <Route path="/share" component={MyNavbar} />
          {/* <Redirect from="/" to="/" /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
