var q1 = require('../qq').q1
  , qq = require('../qq').qq

module.exports = function () {
  var posts   = [].slice.call(qq('.post'))
    , videos  = [].slice.call(qq('.post .video'))

  window.addEventListener('scroll', function () {
    posts.forEach(function (post, idx) {
      if ((post.offsetTop < (window.scrollY - 100 + (idx > 0 ? posts[idx - 1].offsetHeight : 0))
           && post.offsetTop > (window.scrollY - 100))
          || (idx === 0
              && (posts[1]
                  && posts[1].offsetTop > (window.scrollY - 100 + post.offsetHeight)))) {
        post.classList.add('active')
        if (!post._clicked) {
          videos[idx].classList.add('playing')
          if (!~videos[idx].children[1].src.indexOf('?'))
            videos[idx].children[1].src += '?autoplay=1'
        }
      } else {
        post.classList.remove('active')
        videos[idx].classList.remove('playing')
        if (videos[idx].children[1].tagName === 'IFRAME') {
          if (~videos[idx].children[1].src.indexOf('?')) {
            videos[idx].children[1].src = videos[idx].children[1].src.split('?')[0]
          }
        }
      }
    })
  })

  videos.forEach(function (video, idx) {
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
  })
}
