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

  youtube.init(videos, setupVideos)

  console.log(Issue)

  Issue.get(function (issues) {
    issues.forEach(function (issue, idx) {
      var t = template.innerHTML.replace(/%7B/g, '{').replace(/%7D/g, '}')
      var issue = Mustache.render(t, issue)
      var doc = parser.parseFromString(issue, 'text/html').querySelector('.post')
      doc.classList.remove('hidden')
      var v = doc.querySelector('video')
      v.src = v.getAttribute('data-src')
      console.log(doc)
      if ((idx + 1) === issues.length) {
        doc.classList.add('active')
      }
      document.body.insertBefore(doc, posts[0])
    })
    posts   = [].slice.call(qq('.post'))
    videos  = [].slice.call(qq('.post .video'))
    setupVideos()
    setupScroll()
  })

  create.addEventListener('click', function () {
    console.log('redirect to create-issue')
    window.location.pathname = '/create-issue.html'
  })

  function setupScroll () {
    window.addEventListener('scroll', function () {
      posts.forEach(function (post, idx) {
        var video = videos[idx]
          , videoFrame = video.children[1]

        if ((post.offsetTop < (window.scrollY - 100 + (idx > 0 ? posts[idx - 1].offsetHeight : 0))
             && post.offsetTop > (window.scrollY - 100))
            || (idx === 0
                && (posts[1]
                    && posts[1].offsetTop > (window.scrollY - 100 + post.offsetHeight)))) {
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
    videos.forEach(function (video, idx) {
      var videoFrame = video.children[1]

      if (video.parentElement.classList.contains('active')) {
        video.classList.add('playing')
        if (videoFrame.ytPlayer)
          videoFrame.ytPlayer.playVideo()
        else
          videoFrame.play()
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
