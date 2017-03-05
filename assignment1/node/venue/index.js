'use strict'

const repository = require('./repository')

exports.list = function (ctx) {
  return repository.getVenues()
  .then (venues => {
    ctx.status = 200
    ctx.body = JSON.stringify(venues)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.get = function (ctx) {
  return repository.getVenue(ctx.params.id)
  .then (venues => {
    ctx.status = 200
    ctx.body = JSON.stringify(venues)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}