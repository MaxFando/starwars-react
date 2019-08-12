import React, { Component } from "react";

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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    hasError: false,
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
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
    const { isLoggedIn } = this.state;
    return (
      <SwapiServiceProvider value={this.swapiService}>
        <ErrorBoundry>
          <Router>
            <div className="stardb-app">
              <Header isLoggedIn={isLoggedIn} />
              <RandomPlanet />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                />

                <Route path="/people/:id?" component={PeoplePage} />

                <Route exact path="/planets" render={() => <h2>Planets</h2>} />
                <Route path="/planets/:id?" component={PlanetPage} />

                <Route
                  exact
                  path="/starships"
                  render={() => <h2>Starships</h2>}
                />
                <Route path="/starships/:id?" component={StarshipPage} />

                <Route
                  path="/login"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
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
  }
}
