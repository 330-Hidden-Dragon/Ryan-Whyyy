// NOTE(jordan): this will be the 'entry' point for our application
var createIssuePageController = require('./create-issue')
  , issue = require('./schemas/issue.js')

var currentPage = window.location.pathname
  .split('/')   // this
  .reverse()[0] // is
  .replace(/\.html/g, '') // inefficient

console.log('At page', currentPage)

switch(currentPage) {
  case 'create-issue':
    createIssuePageController()
    break
  default:
    break
}
