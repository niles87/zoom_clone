import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Register } from "./components/Register";
import { Room } from "./components/Room";
import { Home } from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
