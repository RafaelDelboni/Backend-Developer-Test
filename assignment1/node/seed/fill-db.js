'use strict'

const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

const path = require('path')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]

let start = Date.now()
let db = new sqlite3.Database(config.storage)

db.serialize(function() {
  console.warn('Seed started')

  db.run('begin transaction')

  let sql = fs.readFileSync('../resources/data.sql','utf8')
  sql.toString().split('\n').forEach(function(line, index, arr) {
    if (index === arr.length - 1 && line === '') { return }
    db.run(line)
  })

  db.run('commit')
})

db.close(function() {
  console.warn('Seed finished: ' + (Date.now() - start) + 'ms')
})
