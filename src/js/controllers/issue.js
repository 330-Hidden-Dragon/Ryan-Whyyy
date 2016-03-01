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

  var issueKey = window.location.search.substr(1)

  db.allDocs({ key: issueKey, include_docs: true }).then(function (result) {
    console.log(result)
    var issue = result.rows[0].doc
    var t = template.innerHTML.replace(/%7B/g, '{').replace(/%7D/g, '}')
    var issue = Mustache.render(t, issue)
    var doc = parser.parseFromString(issue, 'text/html').querySelector('.post')
    doc.classList.remove('hidden')
    var v = doc.querySelector('video')
    v.src = v.getAttribute('data-src')
    console.log(doc)
    document.body.insertBefore(doc, support)
    setupVideos()
  })

  var selflinks = qq('a[href*="' + window.location.pathname + '"]')

  ;[].forEach.call(selflinks, function (selflink) {
    selflink.addEventListener('click', function (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      return false
    })
  })

  youtube.init(videos, setupVideos)

  function setupVideos () {
    var video = document.querySelector('.video')
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
