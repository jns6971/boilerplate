var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    minifyCSS = require('gulp-minify-css'),
    //rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    imageOpt = require('gulp-image-optimization'),
    gutil = require( 'gulp-util'),
    ftp = require( 'vinyl-ftp');

var credentials = require('./server-cred.json');

var jsSources = 'scripts/**/*.js',
    sassSources = 'styles/sass/**/*.scss',
    cssSources = 'styles/css/**/*.css',
    htmlSources = '**/*.html',
    imageSources = ['img/**/*.png','img/**/*.jpg','img/**/*.gif','img/**/*.jpeg'];

gulp.task('styles', function() {
    gulp.src(sassSources)
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('styles/css/'));
});

gulp.task('scripts', function(){
	gulp.src(jsSources)
		.pipe(browserify({ debug: true }))
		.pipe(gulp.dest('build/js'));
});

//Watch task
gulp.task('watch', function() {
	gulp.watch(jsSources,['scripts']);
    gulp.watch(sassSources,['styles']);
});

//minify js
gulp.task('js-minify', function () {
   gulp.src(jsSources)
      .pipe(uglify())
      .pipe(gulp.dest('dist/scripts'));
});

//minify css
gulp.task('css-minify', function () {
    gulp.src(cssSources)
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles/css'));
});

gulp.task('html-minify', function() {
  gulp.src(htmlSources)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    gulp.src(['index.html', '*.pdf'])
        .pipe(gulp.dest('dist'));

    gulp.src('fonts/*')
        .pipe(gulp.dest('dist/fonts'));

});

//optimize images
gulp.task('images', function(cb) {
    gulp.src(imageSources).pipe(imageOpt({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
});

gulp.task( 'deploy', function () {


    var conn = ftp.create( {
        'host': credentials.host,
        'user': credentials.user,
        'password': credentials.password,
        'parallel': 10,
        'log': gutil.log
    });

    var globs = [
        'dist/**'
    ];

    return gulp.src( globs, { base: './dist', buffer: false } )
        .pipe( conn.newer( '' ) ) // only upload newer files 
        .pipe( conn.dest( '' ) );
});

//clean dist folder
gulp.task('clean', function () {
   gulp.src('dist', {'read': false})
      .pipe(clean());
});


//Watch task
gulp.task('dist', ['clean', 'copy', 'js-minify', 'css-minify', 'images']);

gulp.task('default', ['styles', 'scripts', 'watch']);