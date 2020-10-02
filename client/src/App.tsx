import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Create } from "./components/Create";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Room } from "./components/Room";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/createRoom" component={Create} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
