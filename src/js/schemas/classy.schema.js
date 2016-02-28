var Schema = module.exports = function (schema) {
  return function (instance) {
    var value, type
      , valid = Object.keys(schema).every(function (name) {
      value = instance[name]
      type  = schema[name]

      return (type instanceof Function && (value instanceof type
                || type(value)
                || typeof value === typeof type()))
             || (typeof type === 'string' && typeof value === type)
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
