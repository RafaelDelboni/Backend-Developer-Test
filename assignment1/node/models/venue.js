'use strict'

module.exports = function(sequelize, DataTypes) {
  var Venue = sequelize.define('Venue', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Venue.hasMany(models.Item)
      }
    }
  })

  return Venue
}