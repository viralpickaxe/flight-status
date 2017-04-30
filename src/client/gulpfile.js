var gulp = require("gulp")
var sass = require("gulp-sass")
var autoprefixer = require("gulp-autoprefixer")
var shorthand = require("gulp-shorthand")
var minify = require("gulp-cssnano")
var sourcemaps = require("gulp-sourcemaps")

gulp.task("build-styles", function() {
	console.log('hi')
	return gulp.src("./resources/styles/index.scss")
        .pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(shorthand())
		.pipe(minify())
        .pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./build"))

})

gulp.task("watch-styles", function() {

    gulp.watch("resources/styles/**/*.scss", ["build-styles"])

})

gulp.task("styles", ["build-styles", "watch-styles"])