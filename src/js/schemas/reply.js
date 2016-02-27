var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var reply = Schema({
  name: String
})

module.exports = Model(reply)
