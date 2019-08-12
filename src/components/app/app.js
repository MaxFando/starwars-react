import React, { Component } from "react";

import Header from "../header";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import { PeoplePage, StarshipPage, PlanetPage } from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

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
          <div className="stardb-app">
            <Header />
            <RandomPlanet />
            <PeoplePage />
            <PlanetPage />
            <StarshipPage />
          </div>
        </ErrorBoundry>
      </SwapiServiceProvider>
    );
  }
}
