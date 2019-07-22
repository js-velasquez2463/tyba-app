const fetch = require('node-fetch')
const baseUrl = process.env.WEATHER_API_URL
const apiKey = process.env.WEATHER_API_KEY

class Weather {
  /**
   * Get a city weather by its name
   * @param {String} cityName
   * @returns {JSON} endPoint response
   */
  static async getWeather (cityName) {
    const route = `${baseUrl}?q=${cityName}&appid=${apiKey}`
    const method = 'get'
    let response = await fetch(route, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method
    })
    if (response.status === 200) {
      let weather = await response.json()
      return {
        query: route,
        type: method,
        response: weather
      }
    } else {
      const { error } = await response.json()
      throw new Error(`${response.statusText}: ${error}`)
    }
  }
}

module.exports = Weather
