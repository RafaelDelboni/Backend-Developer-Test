'use strict'

let koa = require('koa')

const app = new koa()

const routeConfig = require('./routes')

routeConfig(app)

app.listen(process.env.PORT || 3000)