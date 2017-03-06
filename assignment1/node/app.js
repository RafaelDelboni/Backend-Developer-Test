'use strict'

let koa = require('koa')
const app = new koa()
const routeConfig = require('./routes')

routeConfig(app)

module.exports = app