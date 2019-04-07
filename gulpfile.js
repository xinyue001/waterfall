var gulp = require('gulp');
var sass = require('gulp-sass'); //编译sass
var webserver = require('gulp-webserver'); //开启服务

//1开启服务
gulp.task('server', function() {
	return gulp.src('./oneyuekao')
		.pipe(webserver({
			port: 3232,
			open:true,
			livereload: true,
			//代理
			proxies: [{
				source: '/api/list',
				target: 'http://localhost:3000/api/list'
			}
			]
	}))
})

//编译sass
gulp.task('devcss', function() {
	return gulp.src('./oneyuekao/scss/**/*.scss')
		.pipe(sass()).
	pipe(gulp.dest('./oneyuekao/css'));
})
//监听sass
gulp.task('watching', function() {
	return gulp.watch('./oneyuekao/scss/**/*.scss', gulp.series('devcss'))
})
//管理开发任务
gulp.task('dev', gulp.series('devcss', 'server', 'watching'))



