'use strict'

const app = require('../../app')
const request = require('supertest').agent(app.listen())
const expect = require('expect.js')

let models = require('../../models')

let createBookingObject = function () {
  return models.Booking.create({
    id: 1,
    created: 0,
    items: {
      id: 2,
      booking_id: 1,
      item_id: 3,
      Item: {
        id: 3,
        venue_id: 4,
        name: 'Austin',
        Venue: {
          id: 4,
          name: 'Avenue'
        }
      }
    }
  }, {
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
  });
}

describe('Bookings page integration tests', function () {
  before(function () {
      return models.sequelize.sync()
  })

  beforeEach(function () {
    let booking = models.Booking.destroy({ truncate: true })
    let bookingItem = models.BookingItem.destroy({ truncate: true })
    let item = models.Item.destroy({ truncate: true })
    let venue = models.Venue.destroy({ truncate: true })
    
    return Promise.all([booking, bookingItem, item, venue])
  })

  it('loads /booking correctly', function(done) {
    request
    .get('/booking')
    .expect(200, function(err, res) {
      if (err) return done(err)
      return done()
    })
  })

  it('lists a booking if there is one', function (done) {
    createBookingObject().then(function () {
      request
      .get('/booking')
      .expect(200, function(err, res) {
        if (err) return done(err)
        let responseJson = JSON.parse(res.text)
        expect(responseJson.length).to.be(1)
        return done()
      })
    })
  })

  it('get a booking if there is one', function (done) {
    createBookingObject().then(function () {
      request
      .get('/booking/1')
      .expect(200, function(err, res) {
        if (err) return done(err)
        let responseJson = JSON.parse(res.text)
        expect(responseJson.id).to.be(1)
        expect(responseJson.created).to.be(0)
        expect(responseJson.Venue.name).to.be('Avenue')
        return done()
      })
    })
  })

  it('error when try to get a non existing booking', function (done) {
    createBookingObject().then(function () {
      request
      .get('/booking/7331')
      .expect(500, function(err) {
        if (err) return done(err)
        return done()
      })
    })
  })
})