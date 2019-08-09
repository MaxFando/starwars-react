class SwapiService {
  _apiBase = "https://swapi.co/api/";
  _imageBase = "https://starwars-visualguide.com/assets/img/";

  getResponse = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResponse(`people/`);
    console.log("res", res);
    return res.results.map(this._transformPerson);
  };

  getPerson = async id => {
    const person = await this.getResponse(`people/${id}`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResponse(`planets/`);
    console.log("res", res);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async id => {
    const planet = await this.getResponse(`planets/${id}`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResponse(`starships/`);
    return res.results.map(this._transformStarship);
  };

  getStarship = async id => {
    const starship = await this.getResponse(`starships/${id}`);
    return this._transformStarship(starship);
  };

  getPersonImage = ({ id }) => {
    return `${this._imageBase}characters/${id}.jpg`;
  };

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}starships/${id}.jpg`;
  };

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}planets/${id}.jpg`;
  };

  _extractId = item => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

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
