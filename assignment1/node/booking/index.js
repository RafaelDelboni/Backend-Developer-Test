'use strict'

exports.index = function (ctx) {
  ctx.status = 200
  ctx.body = 'This is booking!'
}

exports.get = function (ctx) {
  ctx.status = 200
  ctx.body = 'This is booking2!'
}