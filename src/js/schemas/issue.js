var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var issue = Schema({
  title: String
})

module.exports = Model(issue)
