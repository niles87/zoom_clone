import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { Room } from "./components/Room";
import { Home } from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
