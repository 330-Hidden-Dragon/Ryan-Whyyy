var q1 = require('../qq').q1
  , qq = require('../qq').qq
  , youtube = require('../youtube')

module.exports = function () {
  var posts   = [].slice.call(qq('.post'))
    , videos  = [].slice.call(qq('.post .video'))
    , create  = q1('.new-btn')

  youtube.init(videos, setupVideos)

  create.addEventListener('click', function () {
    console.log('redirect to create-issue')
    window.location.pathname = '/create-issue.html'
  })

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

  function setupVideos () {
    videos.forEach(function (video, idx) {
      var videoFrame = video.children[1]

      if (video.parentElement.classList.contains('active')) {
        if (videoFrame.ytPlayer)
          videoFrame.ytPlayer.playVideo()
      }

      video.addEventListener('click', function (evt) {
        evt.preventDefault()
        evt.stopPropagation()
        video.classList.toggle('playing')
        video.parentElement._clicked = true
        youtube.togglePlaying(videoFrame)
      })
    })
  }
}
