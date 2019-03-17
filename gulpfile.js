// $$\    $$\$$$$$$\  $$$$$$\$$$$$$$$\  $$$$$$\  $$$$$$$\$$\     $$\ 
// $$ |   $$ \_$$  _|$$  __$$\__$$  __|$$  __$$\ $$  __$$\$$\   $$  |
// $$ |   $$ | $$ |  $$ /  \__| $$ |   $$ /  $$ |$$ |  $$ \$$\ $$  / 
// \$$\  $$  | $$ |  $$ |       $$ |   $$ |  $$ |$$$$$$$  |\$$$$  /  
//  \$$\$$  /  $$ |  $$ |       $$ |   $$ |  $$ |$$  __$$<  \$$  /   
//   \$$$  /   $$ |  $$ |  $$\  $$ |   $$ |  $$ |$$ |  $$ |  $$ |    
// $$\\$  /  $$$$$$\ \$$$$$$  | $$ |    $$$$$$  |$$ |  $$ |  $$ |    
// \__|\_/   \______| \______/  \__|    \______/ \__|  \__|  \__|    


var gulp = require('gulp'),
    browserSync = require('browser-sync'), //автообновление браузера при изменении файлов
    order = require("gulp-order"), //определение порядка конкантенации файлов
    concat = require('gulp-concat'), //объединение нескольких файлов в один
    csscomb = require('gulp-csscomb'); //сортировка стилей по алфавиту + форматирование
    prefixer = require('gulp-autoprefixer'), //добавляет вендроные префиксы
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'), // сжатие css файлов
    shorthand = require('gulp-shorthand'); //сокращение стилей для которых доступен shorthand
const gcc = require('google-closure-compiler').gulp(); // оптимизация и сжатие JS кода


var folder = [
  './src/css',
  './src/js',
  './src/img',
  './src/fonts',
  './bundles/css',
  './bundles/js',
  './bundles/img',
  './bundles/fonts'
];

var path = {
    src: {
        html: 'src/**/*.html',
        css: 'src/**/*.css',
        js: 'src/**/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
    },
    bundles: {
        html: 'bundles/',
        css: 'bundles/css/',
        js: 'bundles/js/',
        img: 'bundles/img/',
        fonts: 'bundles/fonts/'
    },
    watch: {
        html: 'src/**/*.html',
        css: 'src/**/*.css',
        js: 'src/**/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: 'bundles/**/*.*'
};


// Deploy //////////////////////////////////////////////////////////
// Создание каталога папок/файлов будущего проекта
 
gulp.task('/deploy', async function() {
        for (let i = 0; i < folder.length; i++) {
          gulp.src('*.*', {read: false})
            .pipe(gulp.dest(folder[i]))
        };
  gulp.src('./victory/*.css')
  .pipe(gulp.dest('./src/css'))
  gulp.src('./victory/index.js')
  .pipe(gulp.dest('./src/js'))
  gulp.src('./victory/*.html')
  .pipe(gulp.dest('./src'))
  gulp.src('./victory/csscomb.json')
  .pipe(gulp.dest('./node_modules/gulp-csscomb/node_modules/csscomb/config'))
  gulp.src('./victory/csscomb.json')
  .pipe(gulp.dest('./node_modules/csscomb/config'))
  gulp.src('./victory/postcss.config.js')
  .pipe(gulp.dest('./'));
});

// -= ******************************************************** =- \\



// HTML ////////////////////////////////////////////////////////////

gulp.task('/html', async function() {
    return gulp.src(['!src/**/_*.html', path.src.html])
    .pipe(gulp.dest(path.bundles.html));
});

// -= ******************************************************** =- \\



// CSS /////////////////////////////////////////////////////////////

gulp.task('/css', async function() {
    var processors = [
    cssnano(),
  ];
  return gulp.src(path.src.css)
    .pipe(order([
    "**/*reset*.css",
    "**/*normalize*.css",
    "**/*style*.css",
    "**/*media*.css"
  ], { base: './' }))
    .pipe(concat('style.css'))
    .pipe(shorthand())
    .pipe(prefixer())
    .pipe(csscomb())
    .pipe(postcss(processors))
    .pipe(gulp.dest(path.bundles.css));
});

// -= ******************************************************** =- \\



// JS //////////////////////////////////////////////////////////////

gulp.task('/js', async function() {
    return gulp.src(path.src.js)
    .pipe(order([
    "**/*jquery*.js",
    "**/*lib*.js",
    "**/*module*.js",
    "**/*.js"
  ], { base: './' }))
    .pipe(concat('index.js'))
    .pipe(gcc({
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'index.min.js'
        }, {
          platform: ['native', 'java', 'javascript']
        }))
    .pipe(gulp.dest(path.bundles.js));
});

// -= ******************************************************** =- \\



// FONT ////////////////////////////////////////////////////////////

gulp.task('/fonts', async function() {
    return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.bundles.fonts));
});

// -= ******************************************************** =- \\



// IMAGE ///////////////////////////////////////////////////////////

gulp.task('/img', async function() {
    return gulp.src(path.src.img)
    .pipe(gulp.dest(path.bundles.img));
});

// -= ******************************************************** =- \\



////////////////////////////////////////////
///
///
///////////////////////////////////////////
gulp.task('/browser-sync', async function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src/' // Директория для сервера - app
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        browser: "google chrome",
       notify: false // Отключаем уведомления
    });
});

gulp.task('/run', ['/browser-sync'], function() {
    gulp.watch(path.watch.html, ['/html'])
    gulp.watch(path.watch.html, browserSync.reload);
    gulp.watch(path.watch.css, ['/css'])
    gulp.watch(path.watch.css, browserSync.reload);
    gulp.watch(path.watch.js, ['/js'])
    gulp.watch(path.watch.js, browserSync.reload);
    gulp.watch(path.watch.fonts, ['/fonts'])
    gulp.watch(path.watch.fonts, browserSync.reload);
    gulp.watch(path.watch.img, ['/img'])
    gulp.watch(path.watch.img, browserSync.reload);
});

// -= ******************************************************** =- \\


gulp.task('/compile', ['/css', '/js', '/html', '/img', '/fonts']);
gulp.task('/interpret', ['/css', '/js', '/html', '/img', '/fonts', '/run']);


// HELP ///////////////////////////////////////////////////////////

gulp.task('/help', function(){
  console.log('deploy - создание файлов и папок проекта (src для хранения исходников, bundles для загрузки на сервер).\n/html - копирует все файлы html из каталога src => bundles(за исключением тех, у которых в названии присутствует "_").\n/css - конкатенирует, расставляет префиксы, форматирует, оптимизирует и минифицирует файл.\n/js - конкатенирует и оптимизирует все js файлы при помощи google closure compiler.\n/fonts - переносит содержимое папки src/fonts в bundles.\n/img - переносит содержимое папки src/img в bundles.\n/compile - выполняет команды /css, /js, /html, /img, /fonts.\n/interpret - выполняет команды на лету/css, /js, /html, /img, /fonts и отображает в браузере (live reload при изменении любого файла из папки src)');
});

// -= ******************************************************** =- \\