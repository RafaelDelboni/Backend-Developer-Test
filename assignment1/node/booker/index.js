'use strict'

const repository = require('./repository')

exports.list = function (ctx) {
  return repository.getBookers()
  .then (bookers => {
    ctx.status = 200
    ctx.body = JSON.stringify(bookers)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.get = function (ctx) {
  return repository.getBooker(ctx.params.id)
  .then (bookers => {
    ctx.status = 200
    ctx.body = JSON.stringify(bookers)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}