var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var user = Schema({
  id: Number,
  name: String
})

module.expoorts = Model(user)
