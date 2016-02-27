var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var reply = Schema({
  id: Number,
  issue: Number,       // issue id
  parent_post: Number, // post id
  author: Number,      // user id
  author_img: String,  // url
  content: String,
})

module.exports = Model(reply)
