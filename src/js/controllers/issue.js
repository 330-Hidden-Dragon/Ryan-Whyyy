var qq = require('../qq').qq
  , q1 = require('../qq').q1
  , youtube = require('../youtube')

module.exports = function () {
  var videos = [].slice.call(qq('.video'))
    , discuss = q1('.discuss-btn')
    , support = q1('.support-btn')

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
    var video = videos[0]
      , videoFrame = video.children[1]

    video.classList.toggle('playing')
    youtube.play(videoFrame)

    video.addEventListener('click', function (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      video.classList.toggle('playing')
      video.parentElement._clicked = true
      youtube.togglePlaying(videoFrame)
    })
  }

  discuss.addEventListener('click', function () {
    alert('Ok, now you can go to the discuss page, except we don\'t have one')
  })

  support.addEventListener('click', function () {
    alert('Your support is much appreciated!')
  })
}
