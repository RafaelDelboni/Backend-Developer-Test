'use strict'

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    price: DataTypes.REAL
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.Item)
      }
    }
  })

  return Product
}