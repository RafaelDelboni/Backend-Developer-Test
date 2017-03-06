'use strict'

const app = require('../../app')
const request = require('supertest').agent(app.listen())
const expect = require('expect.js')

let models = require('../../models')

describe('Venues page integration tests', function () {
  before(function () {
      return models.sequelize.sync()
  })

  beforeEach(function () {
    return models.Venue.destroy({ truncate: true })
  })

  it('loads /venue correctly', function(done) {
    request
    .get('/venue')
    .expect(200, function(err, res) {
      if (err) return done(err)
      return done()
    })
  })

  it('lists a venue if there is one', function (done) {
    models.Venue.create({ id: 1337, name: 'supahvenue' }).then(function () {
      request
      .get('/venue')
      .expect(200, function(err, res) {
        if (err) return done(err)
        let responseJson = JSON.parse(res.text)
        expect(responseJson.length).to.be(1)
        return done()
      })
    })
  })

  it('get a venue if there is one', function (done) {
    models.Venue.create({ id: 1337, name: 'supahvenue' }).then(function () {
      request
      .get('/venue/1337')
      .expect(200, function(err, res) {
        if (err) return done(err)
        let responseJson = JSON.parse(res.text)
        expect(responseJson.id).to.be(1337)
        expect(responseJson.name).to.be('supahvenue')
        return done()
      })
    })
  })

  it('error when try to get a non existing venue', function (done) {
    models.Venue.create({ id: 1337, name: 'supahvenue' }).then(function () {
      request
      .get('/venue/7331')
      .expect(500, function(err) {
        if (err) return done(err)
        return done()
      })
    })
  })

})