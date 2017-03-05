'use strict'

const models = require('../models')

let getVenues = function () {
  return models.Venue.findAll()
}

let getVenue = function (id) {
  return new Promise(function (resolve, reject) {
    models.Venue.findOne(
      {
        where: {
          id: id
        }
      })
      .then(result => {
        if (!result)
          reject({message: 'Venue not found'})
        resolve(result)
      })
    .catch(error => {
      reject(error)
    })
  })
}

let getVenueByBookingId = function (bookingId) {
  return new Promise(function (resolve, reject) {
    models.Venue.findAll(
      {
        include: [ 
          {
            attributes: [],
            model: models.Item,
            include: [ 
              {
                model: models.BookingItem,
                include: [
                  {
                    model: models.Booking,
                    where: { 
                      id: bookingId 
                    },
                  }
                ]
              }
            ]
          }
        ]
      })
      .then(result => {
        if (!result[0])
          reject({message: 'Venue not found'})
        resolve(result[0])
      })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  getVenues: getVenues,
  getVenue: getVenue,
  getVenueByBookingId: getVenueByBookingId
}