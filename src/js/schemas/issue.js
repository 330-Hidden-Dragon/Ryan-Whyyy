var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')
  , db     = require('../db')

var issue = Schema({
  title: String,
  description: String,
  video: String   // url
})

module.exports = Model(issue)
