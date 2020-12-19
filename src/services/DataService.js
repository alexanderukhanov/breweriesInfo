const URL = "https://api.openbrewerydb.org/breweries/";

export default class DataService {
    async getData(url) {
        const response = await fetch(url)
        const data = await response.json();
        return data
    }
    getBreweries(name) {
        return this.getData(URL.concat("search?query=", name))
    }
    getBreweryInfo(id) {
        return this.getData(URL.concat(id))
    }
}

