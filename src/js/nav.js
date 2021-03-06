module.exports = function () {
  var q1   = require('./qq').q1
    , util = require('./util')

  var searchBar    = q1('.search-bar')
    , searchToggle = q1('.search-btn')
    , searchBtn    = q1('.inner-search-btn')
    , backBtn      = q1('.back-btn')

  function performSearch () {
    alert('How convenient, that was already on the page!')
  }

  if (searchBar) {
    util.togglePlaceholder(searchBar)
    searchBar.addEventListener('focus', function () {
      searchToggle.classList.add('active')
    })
    searchBar.addEventListener('blur', function () {
      searchToggle.classList.remove('active')
    })
    searchBar.addEventListener('keyup', function (evt) {
      if (evt.which === 13)
        performSearch()
    })
    searchBtn.addEventListener('click', function () {
      performSearch()
    })
  }

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.history.back()
    })
  }
}
