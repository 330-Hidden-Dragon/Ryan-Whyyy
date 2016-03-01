
var RecordRTC = require('recordrtc')
  , util      = require('../util')
  , q1        = require('../qq').q1
  , Issue = require('../schemas/issue')
  , db = require('../db')

module.exports = function () {
  var mediaRequests = { audio: true, video: true }
    , recordBtn     = q1('.video-upload-btn')
    , streamView    = q1('video.streaming')
    , recordedView  = q1('video.stored')
    , placeholder   = q1('p.placeholder')
    , description   = q1('textarea')
    , title         = q1('input')
    , submitBtn     = q1('.new-btn')
    , recorder
    , blob

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
      blob = recorder.getBlob()
      validate()
      recordBtn.removeEventListener('click', stopRecording)
      recordBtn.addEventListener('click', startRecording)
    })
  }

  function startRecording (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    ;(navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia).call(navigator, mediaRequests, captureStream, error)
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

  function validate () {
    if (requiredFields.every(function (f) {
      console.log(f, f.value, f.src)
      return (f.value && f.value.length > 0 && f.value !== f.textContent)
             || (f.src !== undefined && f.src !== '')
    })) {
      submitBtn.disabled = false
    } else {
      submitBtn.disabled = true
    }
  }

  var requiredFields = [ title, description, recordedView ]

  ;[ title, description ].forEach(function (field) {
    field.addEventListener('change', function (evt) {
      validate()
    })
  })

  recordBtn.addEventListener('click', function () {
    validate()
  })

  submitBtn.addEventListener('click', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    var reader = new window.FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      var data = {
        title: title.value,
        description: description.value,
        video: reader.result
      }

      data._id = 'Issue:' + data.title.substring(0, 25).replace(/ /g, '_')
                 + ':' + data.description.substring(0, 25).replace(/ /g, '_')

      var newIssue = Issue(data)
      db.put(newIssue).then(function () {
        window.location.href = '/pages/home-page.html'
      })
    }
  })
}
