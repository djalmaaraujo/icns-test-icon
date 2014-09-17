var pkg = require('./package');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var shell = require('gulp-shell');
var NwBuilder = require('node-webkit-builder');

gulp.task('build', ['clean'], function() {
  var nw = new NwBuilder({
    appName: pkg.window.title,
    appVersion: pkg.version,
    buildDir: 'dist',
    files: ['package.json', 'app/**'],
    macIcns: 'app/icon.icns',
    platforms: ['osx'],
    version: '0.10.5'
  });

  nw.on('log', gutil.log);

  return nw.build().catch(gutil.log);
});

gulp.task('clean', function (cb) {
    rimraf('dist', cb);
});

gulp.task('serve', shell.task([
  './node_modules/nodewebkit/bin/nodewebkit . --debug'
]));
