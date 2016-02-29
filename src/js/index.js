// NOTE(jordan): this will be the 'entry' point for our application
var router = require('./router')
  , setupNav = require('./nav')

// NOTE(jordan): make a long-press turn into a click
document.addEventListener('contextmenu', function (event) {
  event.preventDefault()
  event.stopPropagation()
  console.log(event.target)
  event.target.click()
  return false
})

setupNav()

router.load()
