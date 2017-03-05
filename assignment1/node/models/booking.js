'use strict'

module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
    created: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Booking.belongsTo(models.Booker, { as: 'booker'}),
        Booking.hasMany(models.BookingItem, { as: 'items'})
      }
    }
  })

  return Booking
}