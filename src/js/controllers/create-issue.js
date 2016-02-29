
var RecordRTC = require('recordrtc')
  , util      = require('../util')
  , q1        = require('../qq').q1

module.exports = function () {
  var mediaRequests = { audio: true, video: true }
    , recordBtn     = q1('.video-upload-btn')
    , streamView    = q1('video.streaming')
    , recordedView  = q1('video.stored')
    , placeholder   = q1('p.placeholder')
    , description   = q1('textarea')
    , title         = q1('input')
    , submitBtn     = q1('.new-btn')
    , hasUserMedia  = false
    , streamURLObject
    , recorder
    , listenerId

  util.togglePlaceholder(description)

  function stopRecording (evt) {
    evt.preventDefault()
    evt.stopPropagation()
    console.log('stop recording')
    recorder.stopRecording(function (videoUrlObject) {
      recordedView.src = videoUrlObject
      recordedView.style.zIndex = 1
      recordedView.controls = true

      // NOTE(jordan): save this to the issue model
      var blob = recorder.getBlob()
      recordBtn.removeEventListener('click', stopRecording)
      recordBtn.addEventListener('click', startRecording)
    })
  }

  function startRecording (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(mediaRequests)
        .then(captureStream)
        .catch(error)
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(navigator, mediaRequests, captureStream, error)
    }
  }
  
  function captureStream (stream) {
    console.log('begin recording')

    // NOTE(jordan): show stream while recording
    if (!streamView.src)
      streamView.src = URL.createObjectURL(stream)

    // NOTE(jordan): set up RecordRTC
    recorder = RecordRTC(stream, {
      mimeType: 'video/webm',
      bitsPerSecond: 128000
    })

    // NOTE(jordan): hide placeholder
    placeholder.style.display = 'none'

    recordedView.style.zIndex = 0
    recordedView.controls = false

    // NOTE(jordan): start RecordRTC
    recorder.startRecording()
    // NOTE(jordan): change its click handler to stop the recording
    recordBtn.removeEventListener('click', startRecording)
    recordBtn.addEventListener('click', stopRecording)
  }

  function error (error) {
    alert('Could not get access to webcam')
    console.error(error)
  }

  recordBtn.addEventListener('click', startRecording)

  var requiredFields = [ title, description, recordedView ]

  ;[ title, description ].forEach(function (field) {
    field.addEventListener('change', function (evt) {
      if (requiredFields.every(function (f) {
        return (f.value && f.value.length > 0 && f.value !== f.textContent)
               || (f.src !== undefined && f.src !== '')
      })) {
        submitBtn.disabled = false
      } else {
        submitBtn.disabled = true
      }
    })
  })

  recordBtn.addEventListener('click', function () {
    if (requiredFields.every(function (f) {
      return (f.value && f.value.length > 0 && f.value !== f.textContent)
             || (f.src !== undefined && f.src !== '')
    })) {
      submitBtn.disabled = false
    } else {
      submitBtn.disabled = true
    }
  })

  submitBtn.addEventListener('click', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()
    console.log('create issue')
  })
}
