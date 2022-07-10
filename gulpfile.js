const { src, dest, watch, parallel} = require("gulp");
const gulpPlumber = require("gulp-plumber");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber'); //este plumber es para evitar que debido al
// de establecer una variable que no existe, se detenga la ejecucion del script
const cssnano = require ('cssnano');
const autoprefixer = require ('autoprefixer');
const postcss = require ('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser-js');


const webp = require("gulp-webp");


function css(done){
    //Primero indicar la ubicacion del archivo
    src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(gulpPlumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));

    done();
}

function versionwebp (done){

    const opciones = {
        quality: 50
    };

    src("prueba/**/*.jpg")
    .pipe(webp(opciones))
    .pipe(dest("prueba/prueba2"));

    done();
}

function javascript(done){
    src("src/JavaScript/app.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/app.js"))

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css)
    watch("src/JavaScript/**/*.js", javascript)
    done();
}


exports.css = css;
exports.javascript = javascript;
exports.versionwebp = versionwebp;
exports.dev = parallel(dev, versionwebp, javascript);
