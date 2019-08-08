class SwapiService {
  _apiBase = "https://swapi.co/api/";

  async getResponse(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResponse(`people/`);
    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const person = this.getResponse(`people/${id}`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResponse(`planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResponse(`planets/${id}`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResponse(`starships/`);
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = this.getResponse(`starships/${id}`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformStarship = starship => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  };

  _transformPerson = person => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  };

  _transformPlanet = planet => {
    const idRegExp = /\/([0-9]*)\/$/;
    // const id = planet.url.match(idRegExp)[1]
    const id = planet.url
      .split("/")
      .filter(item => item)
      .slice(-1)[0];
    return {
      id,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };
}

export default SwapiService;
