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

let getBookingViewModel = function(booking) {
  for (let i = 0; i < booking.items.length; i++) {
    let venue = _.get(booking.items, [i, 'Item', 'Venue'])
    if (venue)
      return Object.assign(booking, {Venue: venue})
  }
  return booking
}

module.exports = {
  getBookings: getBookings,
  getBooking: getBooking
}
