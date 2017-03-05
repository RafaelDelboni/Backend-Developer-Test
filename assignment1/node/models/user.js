'use strict'

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    registered: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Booker)
      }
    }
  })

  return User
}