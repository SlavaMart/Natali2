const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass");
const gcmq  = require('gulp-group-css-media-queries');
const wait = require("gulp-wait");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// styles
function styles() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gcmq())
    .pipe(concat("all.min.css"))
    .pipe(
      autoprefixer({
        browsers: ["> 0.1%"],
        cascade: false
      })
    )
    //.pipe(
    //  cleanCSS({
    //   level: 2
    //  })
    // )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css"))
    // .pipe(wait(1000))
    .pipe(browserSync.stream());
}

var scriptFiles = [
  './src/js/**/jquery-3.4.1.min.js',
  './src/js/**/slick.min.js',
  './src/js/**/ScrollMagic.min.js',
  './src/js/**/jquery.magnific-popup.js',
  './src/js/**/faq.js',
  './src/js/**/finish.js',
  './src/js/**/privacy.js',
  './src/js/**/main.js'
];

// scripts
function scripts() {
  return gulp
    .src(scriptFiles)
    // .pipe(
    //   uglify({
    //     toplevel: true
    //   })
    // )
    .pipe(concat("all.min.js"))
    .pipe(gulp.dest("./build/js"))
    // .pipe(wait(200))
    .pipe(browserSync.stream());
}

// watch
gulp.task("watch", function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/scss/**/*.scss", styles);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./*.html").on("change", browserSync.reload);
});

// clean
function clean() {
  return del("./build");
}

gulp.task("styles", styles);
gulp.task("scripts", scripts);

// Run build
gulp.task("build", gulp.series(clean, gulp.parallel(styles, scripts)));

// Run dev
gulp.task("dev", gulp.series("build", "watch"));