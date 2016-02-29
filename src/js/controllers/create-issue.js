
var RecordRTC = require('recordrtc')
  , util      = require('../util')
  , q1        = require('../qq').q1

module.exports = function () {
  var mediaRequests = { audio: true, video: true }
    , recordBtn     = q1('.video-upload-btn')
    , video         = q1('video')
    , placeholder   = q1('p.placeholder')
    , description   = q1('textarea')
    , recorder
    , listenerId

  util.togglePlaceholder(description)

  function stopRecording () {
    recorder.stopRecording(function (videoUrlObject) {
      video.src = videoUrlObject
      video.controls = true

      // NOTE(jordan): save this to the issue model
      var blob = recorder.getBlob()
    })
  }

  function startRecording (stream) {
    // NOTE(jordan): hide placeholder
    placeholder.style.display = 'none'

    // NOTE(jordan): show stream while recording
    video.src = URL.createObjectURL(stream)

    // NOTE(jordan): set up RecordRTC
    recorder = RecordRTC(stream, {
      mimeType: 'video/webm',
      bitsPerSecond: 128000
    })

    // NOTE(jordan): start RecordRTC
    recorder.startRecording()
    // NOTE(jordan): change its click handler to stop the recording
    recordBtn.removeEventListener('click', listenerId)
    listenerId = recordBtn.addEventListener('click', stopRecording)
  }

  function error (error) {
    alert('Could not get access to webcam')
    console.error(error)
  }

  listenerId = recordBtn.addEventListener('click', function (evt) {
    console.log(arguments)
    console.log(evt)
    evt.preventDefault()
    ;(navigator.mediaDevices.getUserMedia
      || navigator.getUserMedia).call(navigator, mediaRequests,
        startRecording,
        error)
  })
}
