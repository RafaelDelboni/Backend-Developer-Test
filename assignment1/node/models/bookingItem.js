'use strict'

module.exports = function(sequelize, DataTypes) {
  var BookingItem = sequelize.define('BookingItem', {
    quantity: DataTypes.INTEGER,
    locked_piece_price: DataTypes.REAL,
    locked_total_price: DataTypes.REAL,
    start_timestamp: DataTypes.INTEGER,
    end_timestamp: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        BookingItem.belongsTo(models.Booking),
        BookingItem.belongsTo(models.Item)
      }
    },
    tableName: 'booking_items'
  })

  return BookingItem
}