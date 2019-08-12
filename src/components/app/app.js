import React, { Component } from "react";

import Header from "../header";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import { PeoplePage, StarshipPage, PlanetPage } from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return (
      <SwapiServiceProvider value={this.swapiService}>
        <ErrorBoundry>
          <Router>
            <div className="stardb-app">
              <Header />
              <RandomPlanet />

              <Route exact path="/" render={() => <h2>Welcome to StarDB</h2>} />

              <Route exact path="/people" render={() => <h2>People</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />

              <Route exact path="/planets" render={() => <h2>Planets</h2>} />
              <Route path="/planets/:id?" component={PlanetPage} />

              <Route
                exact
                path="/starships"
                render={() => <h2>Starships</h2>}
              />
              <Route path="/starships/:id?" component={StarshipPage} />
            </div>
          </Router>
        </ErrorBoundry>
      </SwapiServiceProvider>
    );
  }
}
