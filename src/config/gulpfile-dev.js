const path = require('path');
const {src,dest,watch,parallel,series} = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const webpack = require("webpack-stream");
const proxy = require("http-proxy-middleware")

const distPath = '../../dist'

function htmlCopy(){
    return src('../**/*.html')
    .pipe(dest(distPath))
    .pipe(connect.reload());
}
function libsCopy() {
    return src('../libs/**/*')
      .pipe(dest(`${distPath}/libs`))
}
function libsAssets() {
    return src('../assets/**/*')
      .pipe(dest(`${distPath}/assets`))
  }
function packScss(){
    return src(['../style/**/*.scss', '!../style/yo/**/*.scss'])
    .pipe(sass().on('error',sass.logError))
    .pipe(dest(`${distPath}/style`))
    .pipe(connect.reload());
}
function jsCopy(){
    return src('../js/*.js')
    .pipe(webpack({
        mode : 'development',
        entry : {
            app : '../js/app.js',
            appCeshi : '../js/appCeshi.js'
        },
        output : {
            path : path.resolve(__dirname,distPath),
            filename : '[name].js'
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
    .pipe(dest(`${distPath}/js`))
    .pipe(connect.reload());
}

function gulpServer(){
    return connect.server({
        name : "App",
        root : distPath,
        port : 8000,
        host:'10.9.49.30',
        livereload : true,
        middleware: () => {
            return [
                proxy('/api',{
                    target: 'https://m.piaoniu.com/api/v2/home/recommends',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }),
                proxy('/allshows',{
                    target : 'https://m.piaoniu.com/api/v3/activities',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/allshows':''
                    }
                })
            ]
        }

    })
}

function watchFilechange(){
    watch('../*.html',series(htmlCopy))
    watch('../libs/*',series(libsCopy))
    watch('../**/*.scss',series(packScss))
    watch('../**/*',series(jsCopy))
    watch('../assets/*', series(libsAssets))
}


// function defaultTask(cb){
//     cb();
// }


exports.default = series(parallel(htmlCopy,libsCopy,libsAssets,packScss,jsCopy),parallel(gulpServer,watchFilechange));