var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var issue = Schema({
  id: Number,
  author: Number, // user id
  title: String,
  video: String, // url
  description: String,
})

module.exports = Model(issue)
