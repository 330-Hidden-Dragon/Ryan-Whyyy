var q1 = require('../qq').q1
  , qq = require('../qq').qq
  , youtube = require('../youtube')
  , Issue = require('../schemas/issue')
  , Mustache = require('mustache')
  , parser = new DOMParser()

module.exports = function () {
  var posts   = [].slice.call(qq('.post'))
    , videos  = [].slice.call(qq('.post .video'))
    , create  = q1('.new-btn')
    , template = q1('#post-template')
    , _loaded = false

  youtube.init(videos, loadIssues)

  function loadIssues() {
    if (!_loaded) {
      _loaded = true
      Issue.get(function (issues) {
        console.log(issues)
        issues.forEach(function (issue, idx) {
          var t = template.innerHTML.replace(/%7B/g, '{').replace(/%7D/g, '}')
          var issue = Mustache.render(t, issue)
          var doc = parser.parseFromString(issue, 'text/html').querySelector('.post')
          doc.classList.remove('hidden')
          var v = doc.querySelector('video')
          v.src = v.getAttribute('data-src')
          console.log(doc)
          document.body.insertBefore(doc, posts[0])
        })
        posts   = [].slice.call(qq('.post'))
        videos  = [].slice.call(qq('.post .video'))
        validPosts = posts.filter(function (p) {
          return !p.classList.contains('hidden')
        })
        validPosts[0].classList.add('active')
        setupScroll()
        setupVideos()
      })
    }
  }

  create.addEventListener('click', function () {
    console.log('redirect to create-issue')
    window.location.pathname = '/pages/create-issue.html'
  })

  function setupScroll () {
    window.addEventListener('scroll', function () {
      posts.forEach(function (post) {
        var video = post.querySelector('.video')
          , videoFrame = video.children[1]

        if ((post.offsetTop < (window.scrollY + 200)
             && post.offsetTop > (window.scrollY - 200))) {
          post.classList.add('active')
          if (!post._clicked) {
            video.classList.add('playing')
            youtube.play(videoFrame)
          }
        } else {
          post.classList.remove('active')
          video.classList.remove('playing')
          youtube.pause(videoFrame)
        }
      })
    })
  }

  function setupVideos () {
    videos.forEach(function (video) {
      var videoFrame = video.children[1]

      if (video.parentElement.classList.contains('active')) {
        video.classList.add('playing')
        if (videoFrame.tagName === 'IFRAME') {
          if (videoFrame.ytPlayer)
            videoFrame.ytPlayer.playVideo()
        } else {
          videoFrame.play()
        }
      }

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
    })
  }
}
