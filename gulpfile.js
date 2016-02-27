var gulp = require('gulp')
  , $    = require('gulp-load-plugins')()

var bifywify  = require('bify-wify')
  , uglifyify = require('uglifyify')
  , browserSync = require('browser-sync').create()

// NOTE(jordan): source paths for build tasks
var path = {
  base: 'src',
  js: 'src/js/index.js',
  jsall: 'src/js/**/*.js',
  stylus: 'src/stylus/main.styl',
  jade: 'src/**/*.jade',
}

// NOTE(jordan): destination paths for build tasks
var dest = {
  base: 'dist',
  js: 'js/app.bundle.js',
  stylus: 'dist/css'
}

// NOTE(jordan): other global opts, by task
var opts = {
  bify: {
    transform: [ uglifyify ]
  }
}

// NOTE(jordan): utility function for adding inline sourcemaps to a build
function withSourcemaps (stream, pipefn) {
  return stream.pipe($.sourcemaps.init())
    .pipe(pipefn)
    .pipe($.sourcemaps.write())
}

gulp.task('build:js', function () {
  return bifywify.fbify(path.js, dest.js, opts.bify)
})

gulp.task('build:stylus', function () {
  return withSourcemaps(
      gulp.src(path.stylus),
      $.stylus({
        compress: true,
        'include css': true
      })
    ).pipe(gulp.dest(dest.stylus))
    .pipe(browserSync.stream())
})

gulp.task('build:jade', function () {
  return withSourcemaps(
      gulp.src(path.jade),
      $.jade()
    ).pipe(gulp.dest(dest.base))
})

gulp.task('build:dev', [ 'build:js', 'build:stylus', 'build:jade' ])

gulp.task('watch:js', function () {
  bifywify.fwify('index.js', 'app.bundle.js', opts.bify)
})

gulp.task('watch:all', [ 'build:dev' ], function () {
  gulp.watch('src/stylus/**/*.styl', [ 'build:stylus' ])
  gulp.watch(path.jade, [ 'build:jade' ])
  gulp.watch('src/js/**/*.js', [ 'build:js' ]).on('change', browserSync.reload)

  gulp.watch('dist/*.{html,js}').on('change', browserSync.reload)
})

gulp.task('serve', function () {
  browserSync.init({
    server: 'dist'
  })
})

gulp.task('develop', [ 'watch:all', 'serve' ])

// NOTE(jordan): for starters - will add more tasks
gulp.task('build', [ 'build:js' ])

gulp.task('watch', [ 'watch:js' ])
