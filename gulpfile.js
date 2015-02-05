/*
 * gulpfile.js
 */

var gulp = require('gulp');
var ghelper = require('gulp-helper');
ghelper.require();
var pkg = require('./package.json');

gulp.task('default', function() {
	console.log("hoge");
});

gulp.task('concat', function() {
    var target = [
        "src/banner.js",
        "src/object.js",
        "src/string.js",
        "src/number.js",
        "src/array.js",
        "src/function.js",
        "src/math.js",
        "src/date.js",
    ];

    gulp.src(target)
    	.pipe(concat('high.js'))
    	.pipe(replace('<%= version %>', pkg.version))
    	.pipe(gulp.dest('.'))
    	;
});

gulp.task('uglify', function() {
    gulp.src('high.js')
    	.pipe(uglify())
	    .pipe(rename({
	      extname: '.min.js'
	    }))
    	.pipe(gulp.dest('.'))
    	;
});
