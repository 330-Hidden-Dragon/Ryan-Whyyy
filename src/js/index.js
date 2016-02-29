// NOTE(jordan): this will be the 'entry' point for our application
var router = require('./router')
  , setupNav = require('./nav')

setupNav()

router.load()
