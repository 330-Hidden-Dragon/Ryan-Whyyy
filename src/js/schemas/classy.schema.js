var Schema = module.exports = function (schema) {
  return function (instance) {
    var value, type
      , valid = Object.keys(schema).every(function (name) {
      value = instance[name]
      type  = schema[name]

      return value instanceof type
             || (type instanceof Function && typeof value === typeof type())
             || typeof value === type
             || (type.isInstance instanceof Function && type.isInstance(value))
    })

    if (!valid) {
      console.error('Schema:', schema)
      console.error('Instance:', instance)
      throw 'Data does not match schema!'
    }

    return instance
  }
}
