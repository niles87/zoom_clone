import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { Room } from "./components/Room";
import { Home } from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
