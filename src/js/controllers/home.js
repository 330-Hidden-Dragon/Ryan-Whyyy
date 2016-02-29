var q1 = require('../qq').q1
  , qq = require('../qq').qq

module.exports = function () {
  var posts   = [].slice.call(qq('.post'))
    , videos  = [].slice.call(qq('.post .video'))
    , iframes = [].slice.call(qq('.post .video iframe'))

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
        console.log(videos[idx].children[1].tagName)
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
      if (video.classList.contains('playing'))
        iframes[idx].src += '?autoplay=1'
      else
        iframes[idx].src = iframes[idx].src.split('?')[0]
    })
  })
}
