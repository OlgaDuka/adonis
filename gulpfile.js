"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");

var minify = require("gulp-csso");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();
var del = require("del");
var run = require("run-sequence");
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var concat = require('gulp-concat');

var listJsFiles = [
  'source/js/jquery.min.js',
  'source/js/wow.min.js',
  'source/js/jquery.maskedinput.js',
  'source/js/jquery.validate.js',
  'source/js/cleave.js',
  'source/js/phone-mask.js',
  'source/js/custom.js'
];

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions",
        "IE 11"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

// Собирает, минифицирует и записывает в билд
// скрипты одним файлом
gulp.task("js", function() {
  gulp.src(listJsFiles)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(server.reload({stream: true}));
});

// gulp.task("sprite", function () {
//   return gulp.src("source/img/{icon-*.svg,logo-*.svg}")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

gulp.task("images", function () {
  return gulp.src("source/images/*.*")
    .pipe(imagemin([
   imageminJpegRecompress({
     progressive: true,
     max: 80,
     min: 70
   }),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/images"));
});

//gulp.task("html", function () {
//  return gulp.src("source/**/*.html")
//    .pipe(posthtml([
//      include()
//    ]))
//    .pipe(gulp.dest("build"));
//});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/docs/*.pdf",
    "source/css/style.min.css"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copyhtml", function() {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  .pipe(server.reload({stream: true}));
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/styles/**/*.scss", ["style"]);
  gulp.watch("source/**/*.html", ["copyhtml"]);
  gulp.watch("source/js/*.js", ["js"]);
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "js",
    "copyhtml",
   "images",
    done
  );
});
