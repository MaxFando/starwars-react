import React, { useState } from "react";

import Header from "../header";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import {
  PeoplePage,
  StarshipPage,
  PlanetPage,
  LoginPage,
  SecretPage
} from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const swapiService = new SwapiService();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <SwapiServiceProvider value={swapiService}>
      <ErrorBoundry>
        <Router>
          <div className="stardb-app">
            <Header isLoggedIn={isLoggedIn} />
            <RandomPlanet />
            <Switch>
              <Route exact path="/" render={() => <h2>Welcome to StarDB</h2>} />

              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets/:id?" component={PlanetPage} />
              <Route path="/starships/:id?" component={StarshipPage} />

              <Route
                path="/login"
                render={() => (
                  <LoginPage isLoggedIn={isLoggedIn} onLogin={onLogin} />
                )}
              />

              <Route
                path="/secret"
                render={() => <SecretPage isLoggedIn={isLoggedIn} />}
              />

              <Route render={() => <h2>Page not found</h2>} />
            </Switch>
          </div>
        </Router>
      </ErrorBoundry>
    </SwapiServiceProvider>
  );
};

export default App;
