var youtube = module.exports = { }

youtube.init = function init (videos, onReady) {
  window.onYouTubeIframeAPIReady = function () {
    console.log('Init YouTube iFrame API')
    videos.forEach(function (video) {
      var videoFrame = video.children[1]
      if (videoFrame.tagName === 'IFRAME') {
        videoFrame.ytPlayer = new YT.Player(videoFrame, {
          events: {
            onReady: onReady
          }
        })
      }
    })
  }
}

youtube.togglePlaying = function togglePlaying (videoFrame) {
  if (videoFrame.ytPlayer) {
    console.log('TOGGLE PLAYING', videoFrame)
    if (videoFrame.ytPlayer.getPlayerState() === YT.PlayerState.PLAYING)
      videoFrame.ytPlayer.pauseVideo()
    else
      videoFrame.ytPlayer.playVideo()
  } else {
    if (!videoFrame.paused)
      videoFrame.pause()
    else
      videoFrame.play()
  }
}

youtube.play = function startPlaying (videoFrame) {
  if (videoFrame.ytPlayer) {
    videoFrame.ytPlayer.playVideo()
  } else {
    videoFrame.play()
  }
}

youtube.pause = function stopPlaying (videoFrame) {
  if (videoFrame.ytPlayer) {
    videoFrame.ytPlayer.pauseVideo()
  } else {
    videoFrame.pause()
  }
}