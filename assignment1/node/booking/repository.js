'use strict'

const models = require('../models')

let getBookings = function () {
  return models.Booking.findAll(
    {
      include: 
      [ 
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
              include: [models.Space]
            }
          ],
          as: 'items'
        }
      ]
    })
}

let getBooking = function (id) {
  return new Promise(function (resolve, reject) {
    models.Booking.findOne(
      {
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
                include: [models.Space]
              }
            ],
            as: 'items'
          }
        ],
        where: {
          id: id
        }
      })
      .then(result => {
        if (!result)
          reject({message: 'Booking not found'})
        resolve(result)
      })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  getBookings: getBookings,
  getBooking: getBooking
}