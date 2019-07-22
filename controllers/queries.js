const QueryService = require('../services/queries')
const { Query, User } = require('../models')
const { NotFound } = require('http-errors')

class QueryController {
  /**
   *Creates a Query
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns the new Query
   * @memberof QueryController
   */
  static async create (req, res, next) {
    try {
      const {userId} = req.body
      const user = await User.findOne({where: {user_id: userId}})
      if (!user) {
        throw new NotFound('User not found')
      }
      delete req.body.userId
      const result = await user.createQuery(req.body)
      res.status(200).send({
        result
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get weather from a city by its name
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {JSON} weather information of the city
   * @memberof QueryController
   */
  static async getWeather (req, res, next) {
    try {
      const user = req.user
      const { cityName } = req.params
      const weather = await QueryService.getWeather(cityName, user.id)
      res.status(200).send({
        weather
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get population from a city by its name
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {JSON} weather information of the city
   * @memberof QueryController
   */
  static async getPopulation (req, res, next) {
    try {
      const user = req.user
      const { cityName } = req.params
      const population = await QueryService.getPopulation(cityName, user.id)
      res.status(200).send({
        population
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get Queries of an user
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns array of Querys
   * @memberof QuerysController
   */
  static async getQueries (req, res, next) {
    try {
      const {userId} = req.params
      const user = await User.findOne({where: { id: userId }})
      if (!user) {
        throw new NotFound('User not found')
      }
      const queries = await Query.findAll({
        where: {
          userId
        },
        order: [['createdAt', 'DESC']],
        raw: true
      })
      res.status(200).send({
        queries
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = QueryController
