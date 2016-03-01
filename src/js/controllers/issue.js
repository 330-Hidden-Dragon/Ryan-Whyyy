var qq = require('../qq').qq
  , q1 = require('../qq').q1
  , youtube = require('../youtube')
  , db = require('../db')
  , Mustache = require('mustache')

module.exports = function () {
  var videos = [].slice.call(qq('.video'))
    , discuss = q1('.discuss-btn')
    , support = q1('.support-btn')
    , template = q1('#post-template')
    , parser = new DOMParser()
    , _loaded = false

  var issueKey = decodeURIComponent(window.location.search.substr(1))

  youtube.init(videos, loadIssue)

  function loadIssue () {
    if (!_loaded) {
      _loaded = true
      db.allDocs({ key: issueKey, include_docs: true }).then(function (result) {
        console.log(result)
        if (result.rows.length === 0) {
          var posts = [].slice.call(qq('.post'))
          posts.forEach(function (post) {
            if (post.querySelector('h2').textContent === decodeURIComponent(issueKey.split(':')[1])) {
              post.classList.remove('hidden')
            }
          })
        } else {
          var issue = result.rows[0].doc
          var t = template.innerHTML.replace(/%7B/g, '{').replace(/%7D/g, '}')
          var issue = Mustache.render(t, issue)
          var doc = parser.parseFromString(issue, 'text/html').querySelector('.post')
          doc.classList.remove('hidden')
          var v = doc.querySelector('video')
          v.src = v.getAttribute('data-src')
          console.log(doc)
          document.body.insertBefore(doc, support)
        }
        setupVideos()
      })
    }
  }

  var selflinks = qq('a[href*="' + window.location.pathname + '"]')

  ;[].forEach.call(selflinks, function (selflink) {
    selflink.addEventListener('click', function (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      return false
    })
  })

  function setupVideos () {
    var posts = [].slice.call(qq('.post'))
      , validPosts = posts.filter(function (p) {
        return !p.classList.contains('hidden')
      })
      , video = validPosts[0].querySelector('.video')
      , videoFrame = video.children[1]

    video.classList.toggle('playing')
    youtube.play(videoFrame)

    video.addEventListener('click', function (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      video.classList.toggle('playing')
      video.parentElement._clicked = true
      if (video.classList.contains('playing'))
        youtube.play(videoFrame)
      else
        youtube.pause(videoFrame)
    })
  }

  discuss.addEventListener('click', function () {
    alert('Ok, now you can go to the discuss page, except we don\'t have one')
  })

  support.addEventListener('click', function () {
    alert('Your support is much appreciated!')
  })
}
