'use strict'

module.exports = function(sequelize, DataTypes) {
  var Booker = sequelize.define('Booker', {
    created: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Booker.belongsTo(models.User),
        Booker.hasMany(models.Booking)
      }
    }
  })

  return Booker
}