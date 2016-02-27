var Classy = require('classy-js')
  , IsInstance = require('classy-js/core/is-instance')

var base = Classy().use(IsInstance).define

module.exports = function (schema) {
  return base(function (instance, properties) {
    Object.assign(instance, properties)
    schema(instance)
  })
}
