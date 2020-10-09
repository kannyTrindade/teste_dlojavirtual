const gulp        = require('gulp'),
  less            = require('gulp-less'),
  nunjucksRender  = require('gulp-nunjucks-render'),
  del             = require('del'),
  concat          = require('gulp-concat'),
  uglify          = require('gulp-uglify'),
  rename          = require('gulp-rename'),
  browserSync     = require('browser-sync').create(),
  path            = require('path'),
  imagemin        = require('gulp-imagemin'),
  sourcemaps      = require('gulp-sourcemaps');

  var paths = {
    dist: './dist',
    styles: {
      src: './src/less/*.less',
      dist: './dist/css'
    },
    js: {
      src: './src/js/*.js',
      dist: './dist/js'
    },
    fonts: {
      src: './src/fonts/*',
      dist: './dist/fonts'
    },
    images: {
      src: './src/images/*',
      dist: './dist/images'
    },
    includes: 'node_modules'
  }

function nunjucks(){
    return gulp.src('src/pages/**/*.+(html|njk)')
      .pipe(nunjucksRender({
        path: ['src/template/'] // String or Array
      }))
      .pipe(gulp.dest(paths.dist))
      .pipe(browserSync.stream());
}

function css() {
    return (
      gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(less({
        paths: [ 
            './node_modules/bootstrap-less-port/less',
            './node_modules/slick-carousel/slick',
            './src/less'
         ]
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.styles.dist))
      .pipe(browserSync.stream())
    );
  }

function js() {
    return (
        gulp
        .src(['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.min.js','./node_modules/slick-carousel/slick/slick.js','src/js/*'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.js.dist))
        .pipe(browserSync.stream())
    )
  }

function fonts() {
  return (
    gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(browserSync.stream())
  )
}

function images() {
  return (
    gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dist))
    .pipe(browserSync.stream())
  )
}
  
function clean() {
    return del(paths.dist);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    // Watched files paths
    gulp.watch('src/**/*.html', nunjucks);
    gulp.watch('src/less/*.less', css);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.images.src, images);
	  gulp.watch('./**/*.html').on('change',browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(images,fonts,css,js,watch,nunjucks));

exports.default = build;
exports.watch = watch;
exports.nunjucks = nunjucks;