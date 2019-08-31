const gulp = require('gulp');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',                                   // Путь для вывода html
        js: 'build/js/',                                  // Путь для вывода js
        css: 'build/css/',                                // Путь для вывода css
        img: 'build/img/',                                // Путь для вывода картинок
        fonts: 'build/fonts/',                            // Путь для вывода шрифтов
        php: 'build/',                                    // Путь для вывода php скриптов
        config: 'build/config/',                          // Путь для вывода php конфигов
        tpl: 'build/tpl/'                                 // Путь для вывода php шаблонов
    },
    src: {
        html: 'src/*.html',                               // Исходники для сборки html
        js: 'src/assets/js/main.js',                      // Исходники для сборки js
        style: 'src/assets/styles/main.sass',             // Исходники для сборки sass
        img: 'src/assets/img/**/*.*',                     // Исходники для сборки картинок
        fonts: 'src/assets/fonts/**/*.*',                 // Исходники для сборки шрифтов
        php: 'src/*.php',                                 // Исоходники для сборки php скриптов
        config: 'src/config/*.php',                       // Исоходники для сборки php конфигов
        tpl: 'src/templates/*.php'                        // Исоходники для сборки php шаблонов
    },
    watch: {
        html: 'src/**/*.html',                            // Пути для слежение за html
        js: 'src/assets/js/**/*.js',                      // Пути для слежение за js
        style: 'src/assets/styles/**/*.sass',             // Пути для слежение за sass
        img: 'src/assets/img/**/*.*',                     // Пути для слежение за картинками
        fonts: 'src/assets/fonts/**/*.*',                 // Пути для слежение за шрифтами
        php: 'src/*.php',                                 // Пути для слежение за php скриптами
        config: 'src/config/*.php',                       // Пути для слежение за php конфигами
        tpl: 'src/templates/*.php'                        // Пути для слежение за php шаблонами
    },
    clean: './build'                                      // Папка для чистки (Корень сборки)
};

// Конфиг для BrowserSync
var config = {
    server: {
        baseDir: "./build"                                // Папка для запуска сервера (Корень сборки)                    
    },
    tunnel: false,                                        // Нужен ли туннель для доступа к проекту из вне (true - Включено)
    host: 'localhost',                                    // Хост для запуска сервера (localhost)
    port: 3000,                                           // Порт для сервера (3000, 9000, ...)
    logPrefix: "slpServer"                                // Префикс для вывода логов
};

// Запуск сервера
gulp.task('webserver', function () {
    browserSync(config);                                  // В аргумент передаем конфиг для BrowserSync
});

// Очистка корня сборки
gulp.task('clean', function (cb) {
    return rimraf(path.clean, cb);
});

// Сборка html
gulp.task('html:build', function () {
    return gulp.src(path.src.html) 
        .pipe(rigger())                                   // Вклеивает наши вставки (//= chank.html)
        .pipe(gulp.dest(path.build.html))                 // Выводит в папку сборки
        .pipe(reload({stream: true}));                    // Перезагружаем сервер
});

// Сборка js
gulp.task('js:build', function () {
    return gulp.src(path.src.js) 
        .pipe(rigger())                                   // Вклеивает наши вставки (//= chank.html)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))                   // Добавляем приписку .min
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// Сборка стилей
gulp.task('style:build', function () {
    return gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))                                               // Компилируем sass в css
        .pipe(prefixer())                                 // Добавляем вендорные префиксы
        .pipe(cssmin())                                   // Минифицируем css
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// Сборка картинок
gulp.task('image:build', function () {
    return gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))                                               // Сжимаем картинки
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

// Сборка шрифтов
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Сборка php скриптов
gulp.task('php:build', function() {
    return gulp.src(path.src.php)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.php))
        .pipe(reload({stream: true}));
});

// Сборка php конфигов
gulp.task('config:build', function() {
    return gulp.src(path.src.config)
        .pipe(gulp.dest(path.build.config))
        .pipe(reload({stream: true}));
});

// Сборка php шаблонов
gulp.task('tpl:build', function() {
    return gulp.src(path.src.tpl)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.tpl))
        .pipe(reload({stream: true}));
});

// Запуск всей сборки
gulp.task('build', gulp.series(
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'php:build',
    'config:build',
    'tpl:build'
));


// Слежка за изменением
gulp.task('watch', function(){
    gulp.watch([path.watch.html], gulp.series('html:build'));
    gulp.watch([path.watch.style], gulp.series('style:build'));
    gulp.watch([path.watch.js], gulp.series('js:build'));
    gulp.watch([path.watch.img], gulp.series('image:build'));
    gulp.watch([path.watch.fonts], gulp.series('fonts:build'));
    gulp.watch([path.watch.php], gulp.series('php:build'));
    gulp.watch([path.watch.config], gulp.series('config:build'));
    gulp.watch([path.watch.tpl], gulp.series('tpl:build'));
});


// По умолчанию (Запуск - gulp)
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('build'),
    gulp.parallel('watch', 'webserver')
));
