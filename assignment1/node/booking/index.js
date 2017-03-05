'use strict'

const repository = require('./repository')
const venueRepository = require('../venue/repository')

exports.list = function (ctx) {
  return repository.getBookings()
  .then (bookings => {
    ctx.status = 200
    ctx.body = JSON.stringify(bookings)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.get = function (ctx) {
  return repository.getBooking(ctx.params.id)
  .then (bookings => {
    return venueRepository.getVenueByBookingId(ctx.params.id)
      .then (venues => {
        ctx.status = 200
        ctx.body = JSON.stringify(
          Object.assign({bookings}, {venue: venues}) 
        )
      })
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}