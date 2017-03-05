'use strict'

let Router = require('koa-router')

let booker = require('./booker/')
let bookerRoute = new Router({prefix: '/booker(s\\b|\\b)'})
bookerRoute
  .get('/', booker.list)
  .get('/:id(\\d+)', booker.get)

let venue = require('./venue/')
let venueRoute = new Router({prefix: '/venue(s\\b|\\b)'})
venueRoute
  .get('/', venue.list)
  .get('/:id(\\d+)', venue.get)

let booking = require('./booking/')
let bookingRoute = new Router({prefix: '/booking(s\\b|\\b)'})
bookingRoute
  .get('/', booking.list)
  .get('/:id(\\d+)', booking.get)

function error404(ctx) {
  ctx.status = 404
  ctx.body = { error: 'Page not found' }
}

module.exports = app => {
  app.use(bookerRoute.routes())
  app.use(venueRoute.routes())
  app.use(bookingRoute.routes())
  app.use(error404)
}