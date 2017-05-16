'use strict';

var gulp 			= require('gulp');
var $ 				= require('gulp-load-plugins')({scope: ['dependencies', 'devDependencies']});
var fs 				= require('fs');
var yaml 			= require('yamljs');
var argv 			= require('optimist').argv;
var gutil 			= require("gulp-util");
var os 				= require('os');
var path 			= require('path');
const image 		= require('gulp-image');
const imageResize 	= require('gulp-image-resize-ar');


var dest 			= './optim/';

//------------------------------------------------------------------------------
//images------------------------------------------------------------------------
var sizePx 		= [100, 75, 50, 25];
var suffix 		= ['xl', 'l', 'm', 's'];
var isRetina 	= true;

//JPG AND PNG ONLY.
gulp.task('images', function (){
	for(var i = 0; i < sizePx.length; i++){
		gulp.src('sources/*')
		.pipe(imageResize({
			width : sizePx[i] + '%',
			imageMagick: true
		}))
		.pipe(image())
		.pipe($.rename({suffix: '-' + suffix[i]}))
		.pipe(gulp.dest(dest+'@1x/'))
		if(isRetina){
			gulp.src('sources/*')
			.pipe(imageResize({
				width : (sizePx[i]*2) + '%',
				imageMagick: true
			}))
			.pipe(image())
			.pipe($.rename({suffix: '-' + suffix[i] + '@2x'}))
			.pipe(gulp.dest(dest+'@2x/'))
		}
	}
});
