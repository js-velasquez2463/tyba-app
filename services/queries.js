const { Query } = require('../models')
const WeatherLib = require('../libs/weather')
const PopulationLib = require('../libs/population')

class QueryService {
  /**
   * Get weather of a city by its name
   * @param {Integer} userId
   * @param {String} query
   * @param {String} type
   * @param {JSON} response
   * @returns Response
   */
  static async getWeather (cityName, userId) {
    try {
      const out = await WeatherLib.getWeather(cityName)
      const { query, type, response } = out
      await Query.create({
        userId,
        query,
        type,
        result: response
      })
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Get population of a city by its name
   * @param {Integer} userId
   * @param {String} query
   * @param {String} type
   * @param {JSON} response
   * @returns Response
   */
  static async getPopulation (cityName, userId) {
    try {
      if (cityName && typeof cityName === 'string') {
        cityName = cityName.toLowerCase()
      }
      const out = await PopulationLib.getPopulation(cityName)
      const { query, type, response } = out
      await Query.create({
        userId,
        query,
        type,
        result: response
      })
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Save a query made by an user
   * @param {Integer} userId
   * @param {String} query
   * @param {String} type
   * @param {JSON} response
   * @returns Query created by the user
   */
  static async saveQuery (userId, query, type, response) {
    try {
      const newQuery = await Query.create({
        userId,
        query,
        type,
        response
      })
      return newQuery
    } catch (error) {
      throw error
    }
  }

  /**
   * Get the queries made by an user
   * @param {Integer} userId
   * @returns {Array} user queries
   */
  static async getQueries (userId) {
    try {
      const queries = await Query.findAll({
        where: {
          userId
        },
        raw: true
      })
      return queries
    } catch (error) {
      throw error
    }
  }
}
module.exports = QueryService
