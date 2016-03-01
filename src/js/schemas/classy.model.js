var Classy     = require('classy-js')
  , IsInstance = require('classy-js/core/is-instance')
  , db         = require('../db')

var base = Classy().use(IsInstance).use(function (self) {
  self.get = function (then) {
    db.allDocs({ include_docs: true }).then(function (results) {
      then(results.rows.map(function (result) {
        return result.doc
      }).filter(function (doc) {
        return self.isInstance(doc)
      }))
    }).catch(function (err) {
      console.error(err)
    })
  }
}).define

module.exports = function (schema) {
  return base(function (instance, properties) {
    Object.assign(instance, properties)
    schema(instance)
  })
}
