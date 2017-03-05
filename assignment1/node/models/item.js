'use strict'

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.Venue),
        Item.hasOne(models.Space),
        Item.hasOne(models.Product),
        Item.hasMany(models.BookingItem)
      }
    }
  })

  return Item
}