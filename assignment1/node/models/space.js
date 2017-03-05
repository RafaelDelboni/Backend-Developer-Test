'use strict'

module.exports = function(sequelize, DataTypes) {
  var Space = sequelize.define('Space', {
    hour_price: DataTypes.REAL
  }, {
    classMethods: {
      associate: function(models) {
        Space.belongsTo(models.Item)
      }
    }
  })

  return Space
}