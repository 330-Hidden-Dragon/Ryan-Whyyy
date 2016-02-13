var gulp = require('gulp')
  , $    = require('gulp-load-plugins')()

var bifywify = require('bify-wify')

gulp.task('example', function () {
  // this is a gulp task
})

gulp.task('build:js', function () {
  return bifywify.fbify('src/index.js', 'app.bundle.js')
})

gulp.task('watch:js', function () {
  bifywify.fwify('src/index.js', 'app.bundle.js')
})

// NOTE(jordan): for starters - will add more tasks
gulp.task('build', [ 'build:js' ])

gulp.task('watch', [ 'watch:js' ])


