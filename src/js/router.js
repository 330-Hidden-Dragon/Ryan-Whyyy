var homeController = require('./controllers/home')
  , createIssueController = require('./controllers/create-issue')

var router = { }

router.load = function () {
  var currentPage
    = router.currentPage
    = window.location.pathname
    .split('/')   // this
    .reverse()[0] // is
    .replace(/\.html/g, '') // inefficient

  console.log('At page', currentPage)

  switch(currentPage) {
    case 'home-page':
      homeController()
      break
    case 'create-issue':
      createIssueController()
      break
    default:
      break
  }
}

module.exports = router
