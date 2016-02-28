var Model  = require('./classy.model.js')
  , Schema = require('./classy.schema.js')

var issue = Schema({
  id: Number,
  author: Number, // user id
  author_image: String, // profile image
  title: String,
  description: String,
  video: Schema({
    external: Boolean,
    url: String,
  }),
})

module.exports = Issue = Model(issue)
