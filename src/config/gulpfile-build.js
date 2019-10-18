const path = require('path');
const {src,dest,parallel,series} = require("gulp");
const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const cleanCSS = require('gulp-clean-css');
const rev = require("gulp-rev");
const revCollector =require("gulp-rev-collector")

const buildPath = '../../build'

function htmlCopy(){
    return src([`${buildPath}/rev/**/*.json`, '../*.html'])
    .pipe(revCollector())
    .pipe(dest(buildPath))
    
}
function libsCopy() {
    return src('../libs/**/*')
      .pipe(dest(`${buildPath}/libs`))
}
function libsAssets() {
    return src('../assets/**/*')
      .pipe(dest(`${buildPath}/assets`))
  }
function packScss(){
    return src('../style/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(dest(`${buildPath}/style`))
    .pipe(rev.manifest())
    .pipe(dest(`${buildPath}/rev/styles`))
    
}
function jsCopy(){
    return src('../js/app.js')
    .pipe(webpack({
        mode : 'production',
        entry : '../js/app.js',
        output : {
            path : path.resolve(__dirname,buildPath),
            filename : 'app.js'
        },
        module : {
            rules : [
                {
                    test : /\.html$/,
                    loader : 'string-loader'
                },
                {
                    test : /\.art$/,
                    loader : "art-template-loader"
                }
            ]
        }
    }))
    .pipe(rev())
    .pipe(dest(`${buildPath}/js`))
    .pipe(rev.manifest({}))
    .pipe(dest(`${buildPath}/rev/js`))
}



// function defaultTask(cb){
//     cb();
// }


exports.default = series(parallel(libsCopy,libsAssets,packScss,jsCopy),htmlCopy);