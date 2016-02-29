var q1 = require('../qq').q1

module.exports = function () {
  var video = q1('.video')

  video.addEventListener('click', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()
    video.classList.toggle('playing')
    video.parentElement._clicked = true
    if (video.children[1].tagName === 'IFRAME') {
      if (video.classList.contains('playing'))
        video.children[1].src += '?autoplay=1'
      else
        video.children[1].src = video.children[1].src.split('?')[0]
    }
  })
}
