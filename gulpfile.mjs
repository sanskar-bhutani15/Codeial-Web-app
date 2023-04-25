
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import Sass from 'sass';
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import gulpUglify from 'gulp-uglify-es';
import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del';

gulpSass.compiler = Sass;

const sass = gulpSass(Sass);
const uglify = gulpUglify.default;

gulp.task('css', async function(done){
    console.log('minifying css......');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
});

gulp.task('js', async function(done){
    console.log('minifying js..........');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', async function(done){
    console.log('compressing images......');
    gulp.src('./assets/**/*.+(png|jpg|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public.assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('clean:assets', async function(done){
    deleteAsync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('building assets');
    done();
})