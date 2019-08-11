import React, { Component } from "react";

import Header from "../header";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

import { SwapiServiceProvider } from "../swapi-service-context";

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from "../sw-components";

import "./app.css";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
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

            <PersonDetails itemId={10} />
            <StarshipDetails itemId={10} />
            <PlanetDetails itemId={10} />

            <PersonList />
            <StarshipList />
            <PlanetList />
          </div>
        </ErrorBoundry>
      </SwapiServiceProvider>
    );
  }
}
