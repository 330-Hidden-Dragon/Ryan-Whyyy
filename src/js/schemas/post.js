var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var post = Schema({
  name: String
})

module.exports = Model(post)
