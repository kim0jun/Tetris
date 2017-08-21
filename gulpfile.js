// =========================================================================================================================================================

/* !------------------------------------------------- */
/* !  NPM Require */
// npm i --save gulp gulp-webserver gulp-concat gulp-clean-css gulp-livereload gulp-rename gulp-util gulp-uglify gulp-sass gulp-babel babel-core babel-cli babel-preset-es2015
// sudo npm i --g eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import babel-eslint 

// =========================================================================================================================================================
const gulp = require("gulp");
const webserver = require("gulp-webserver");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const livereload = require("gulp-livereload");
const rename = require("gulp-rename");
const gutil = require("gulp-util");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const sassLint = require("gulp-sass-lint");
// =========================================================================================================================================================

/* !------------------------------------------------- */
/* !  Constant & Variable */

// =========================================================================================================================================================
const PATH = {
    html: [
        "src/*.html",
    ],
    script: [
        "src/js/ar.ie8.js",
        "src/js/ar.jquery.1.12.4.js",
        "src/js/kakao.link.min.js",
        "src/js/TweenMax.js",
        "src/js/temp.js",
    ],
    script_babel: [
        "src/js/ar.utils.js",
        "src/js/ar.string.extend.js",
        "src/js/app.util.js",
        "src/js/app.main.js",
    ],
    scss: [
        "src/sass/app.main.scss",
    ],
    img: [
        "src/img/*.*",
    ],
};

const PATH_REACT = {

};
//= =========================================================================================================================================================

/* !------------------------------------------------- */
/* !  Gulp Setting */

//= =========================================================================================================================================================
gulp.task("server", () => gulp.src("dist/")
    .pipe(webserver()));

gulp.task("compress-html", () => gulp.src(PATH.html)
    // .pipe(minifyhtml())
    .pipe(gulp.dest("dist/"))
    .pipe(livereload()));

gulp.task("ecma-convert-js", () => gulp.src(PATH.script_babel)
    .pipe(babel({ compact: false, presets: ["es2015"] }))
    .pipe(concat("temp.js"))
    .pipe(gulp.dest("src/js")));

gulp.task("combine-js", () => gulp.src(PATH.script)
    .pipe(concat("app.bundle.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify().on("error", gutil.log))
    .pipe(rename("app.bundle.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload()));

gulp.task("minify-sass", () => gulp.src(PATH.scss)
    .pipe(sass())
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(concat("app.main.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload()));

gulp.task("minify-img", () => gulp.src("src/img/*.*")
    // .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest("dist/img"))
    .pipe(livereload()));

gulp.task("watch", () => {
    livereload.listen();
    gulp.watch(PATH.html, ["compress-html"]);
    gulp.watch(PATH.script_babel, ["ecma-convert-js"]);
    gulp.watch(PATH.script, ["combine-js"]);
    gulp.watch(PATH.scss, ["minify-sass"]);
    gulp.watch(PATH.img, ["minify-img"]);
});

// default gulp task
gulp.task("default", ["server", "compress-html", "ecma-convert-js", "minify-sass", "minify-img", "combine-js", "watch"]);

// react js gulp task
gulp.task("react", ["server", "compress-html", "ecma-convert-js", "combine-js", "minify-sass", "minify-img", "watch"]);
