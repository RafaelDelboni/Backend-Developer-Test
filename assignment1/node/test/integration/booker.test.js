'use strict'

const app = require('../../app')
const request = require('supertest').agent(app.listen())
const expect = require('expect.js')

let models = require('../../models')

describe('Bookers page integration tests', function () {
  before(function () {
      return models.sequelize.sync()
  })

  beforeEach(function () {
    let user = models.User.destroy({ truncate: true })
    let booker = models.Booker.destroy({ truncate: true })
    
    return Promise.all([user, booker])
  })

  it('loads /booker correctly', function(done) {
    request
    .get('/booker')
    .expect(200, function(err, res) {
      if (err) return done(err)
      return done()
    })
  })

  it('lists a booker if there is one', function (done) {
    models.User.create({ id: 1, first_name: 'first', last_name: 'last', email: 'email' }).then(function () {
      models.Booker.create({ id: 2, user_id: 1, created: 0 }).then(function () {
        request
        .get('/booker')
        .expect(200, function(err, res) {
          if (err) return done(err)
          let responseJson = JSON.parse(res.text)
          expect(responseJson.length).to.be(1)
          return done()
        })
      })
    })
  })

  it('get a booker if there is one', function (done) {
    models.User.create({ id: 1, first_name: 'first', last_name: 'last', email: 'email' }).then(function () {
      models.Booker.create({ id: 2, user_id: 1, created: 0 }).then(function () {
        request
        .get('/booker/2')
        .expect(200, function(err, res) {
          if (err) return done(err)
          let responseJson = JSON.parse(res.text)
          expect(responseJson.id).to.be(2)
          expect(responseJson.created).to.be(0)
          expect(responseJson.User.first_name).to.be('first')
          return done()
        })
      })
    })
  })

  it('error when try to get a non existing booker', function (done) {
    models.User.create({ id: 1, first_name: 'first', last_name: 'last', email: 'email' }).then(function () {
      models.Booker.create({ id: 2, user_id: 1, created: 0 }).then(function () {
        request
        .get('/booker/4')
        .expect(500, function(err) {
          if (err) return done(err)
          return done()
        })
      })
    })
  })
})