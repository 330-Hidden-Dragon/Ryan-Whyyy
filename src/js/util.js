var util = { }

util.togglePlaceholder = function (domEl) {
  var _value = domEl.value

  domEl.addEventListener('focus', function () {
    if (domEl.value === _value)
      domEl.value  = ''
  })

  domEl.addEventListener('blur', function () {
    if (domEl.value.length === 0) {
      domEl.value = _value
    }
  })
}

module.exports = util
