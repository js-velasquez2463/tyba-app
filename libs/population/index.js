const fetch = require('node-fetch')
const baseUrl = process.env.POPULATION_API_URL

class Population {
  /**
   * Get a city weather by its name
   * @param {String} cityName
   * @returns {JSON} endPoint response
   */
  static async getPopulation (cityName) {
    const route = `${baseUrl}/?dataset=worldcitiespop&rows=1&sort=population&refine.city=${cityName}`
    const method = 'get'
    let response = await fetch(route, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method
    })
    if (response.status === 200) {
      let population = await response.json()
      if (population && population.records && population.records.length > 0 &&
        population.records[0].fields) {
        population = population.records[0].fields
      } else {
        population = `City ${cityName} not found`
      }
      return {
        query: route,
        type: method,
        response: population
      }
    } else {
      const { error } = await response.json()
      throw new Error(`${response.statusText}: ${error}`)
    }
  }
}

module.exports = Population
