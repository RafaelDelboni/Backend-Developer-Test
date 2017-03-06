'use strict';

const expect = require('expect.js')
let models = require('../../models')

describe('Unit testing models', function () {
  it('returns the Booker model', function () {
    expect(models.Booker).to.be.ok()
  })

  it('returns the Booking model', function () {
    expect(models.Booking).to.be.ok()
  })

  it('returns the Booking Item model', function () {
    expect(models.BookingItem).to.be.ok()
  })

  it('returns the Item model', function () {
    expect(models.Item).to.be.ok()
  })

  it('returns the Product model', function () {
    expect(models.Product).to.be.ok()
  })

  it('returns the Space model', function () {
    expect(models.Space).to.be.ok()
  })

  it('returns the User model', function () {
    expect(models.User).to.be.ok()
  })
  
  it('returns the Venue model', function () {
    expect(models.Venue).to.be.ok()
  })
});