'use strict'

const { NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../configuration/jwtSecret').secret
const {User} = require('../models')
const UserService = require('../services/user')

class UserController {
  /**
   * Get the list of all users
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async list (req, res, next) {
    try {
      let users = await User.findAll()
      res.status(200).send(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get an user by id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async retrieve (req, res, next) {
    try {
      let user = await User.findByPk(req.params.userId)
      if (user) {
        res.status(200).send(user)
      } else {
        throw new NotFound('User not found')
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new user
   * @param {} req
   * @param {*} res
   * @param {*} next
   */
  static async create (req, res, next) {
    try {
      let user = await UserService.createUser(req.body)
      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * updates an user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async update (req, res, next) {
    try {
      let user = await User.findByPk(req.params.userId)
      if (user) {
        let userParams = {
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
          email: req.body.email || user.email
        }
        if (req.body.password) {
          userParams['password'] = req.body.password
        }
        user = await user.update(userParams)
        res.status(200).send(user)
      } else {
        throw new NotFound('User not found')
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Login an user by his/her email and password
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async authenticate (req, res, next) {
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (user && await user.validPassword(password)) {
        const token = jwt.sign({ email: user.email }, jwtSecret, {
          expiresIn: '1d'
        })
        return res.status(200).send({
          token: 'JWT ' + token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        })
      }
      res.status(400).send({
        message: 'Invalid user data'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
