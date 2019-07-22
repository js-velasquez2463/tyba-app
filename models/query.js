'use strict'

const { DATE, STRING, JSON } = require('sequelize')
const BaseModel = require('./baseModel')

class Query extends BaseModel {
  static get schema () {
    return {
      query: {
        type: STRING,
        allowNull: false
      },
      type: {
        type: STRING,
        allowNull: false
      },
      result: {
        type: JSON
      },
      createdAt: {
        allowNull: false,
        type: DATE
      },
      updatedAt: {
        allowNull: false,
        type: DATE
      }
    }
  }

  /**
   * Initializes the model
   * @param {Sequelize} sequelize initial configuration
   */
  static init (sequelize) {
    return super.init(this.schema, {
      timestamps: true,
      tableName: 'queries',
      sequelize,
      hooks: this.hooks
    })
  }

  /**
   * Associate the different models
   * @param {Sequelize models} models
   */
  static associate (models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }

  /**
   *Generate the hook triggers of the model
   * @readonly
   * @static
   * @memberof User
   */
  static get hooks () {
    return {
    }
  }
}

module.exports = Query
