var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var post = Schema({
  id: Number,
  issue: Number,  // issue id
  author: Number, // user id
  author_img: String, // url
  title: String,
  content: String,
})

module.exports = Model(post)
