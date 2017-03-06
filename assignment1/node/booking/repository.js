'use strict'

const _ = require('lodash')
const models = require('../models')

let getBookingFindOptions = function (id) {
  let select = {
    include: [ 
      {
        model: models.Booker,
        include: [ models.User ],
        as: 'booker'
      },
      {
        model: models.BookingItem,
        include: [ 
          {
            model: models.Item,
            include: [models.Space, models.Venue]
          }
        ],
        as: 'items'
      }
    ]
  }
  let query = {
    where: {
      id: id
    }
  }
  return (id) ? Object.assign(select, query) : select
}

let getBookings = function () {
  return new Promise(function (resolve, reject) {
    models.Booking.findAll(
      getBookingFindOptions())
      .then(result => {
        if (!result)
          reject({message: 'Booking not found'})
        let plainObjectArray = result.map((node) => getBookingViewModel(node.get({ plain: true })))
        resolve(plainObjectArray)
      })
    .catch(error => {
      reject(error)
    })
  })
}

let getBooking = function (id) {
  return new Promise(function (resolve, reject) {
    models.Booking.findAll(
      getBookingFindOptions(id))
      .then(result => {
        if (!result[0])
          reject({message: 'Booking not found'})
        let plainObjectArray = result.map((node) => getBookingViewModel(node.get({ plain: true })))
        resolve(plainObjectArray[0])
      })
    .catch(error => {
      reject(error)
    })
  })
}

let getBookingViewModel = function(result) {
  let venue = _.get(result, ['items', 0, 'Item', 'Venue'])
  return (venue) ? Object.assign({result}, {Venue: venue}) : result
}

module.exports = {
  getBookings: getBookings,
  getBooking: getBooking
}
