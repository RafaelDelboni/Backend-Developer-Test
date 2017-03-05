'use strict'

const models = require('../models')

let getBookers = function () {
  return models.Booker.findAll({
    include: [ models.User ]
  })
}

let getBooker = function (id) {
  return new Promise(function (resolve, reject) {
    models.Booker.findOne(
      {
        include: [ models.User ],
        where: {
          id: id
        }
      })
      .then(result => {
        if (!result)
          reject({message: 'Booker not found'})
        resolve(result)
      })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  getBookers: getBookers,
  getBooker: getBooker
}