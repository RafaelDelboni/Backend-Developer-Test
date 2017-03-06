'use strict'

const repository = require('./repository')

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
    ctx.status = 200
    ctx.body = JSON.stringify(bookings)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}


