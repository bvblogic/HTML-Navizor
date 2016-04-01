module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    newer: {
      options: {
        tolerance: 1000
      }
    },
    less: {
      development: {
        files: {
          'css/bootstrap-custom.css': 'less/bootstrap.less'
        }
      }
    },
    concat: {
      js: {
        src: [
              'node_modules/outdated-browser/outdatedbrowser/outdatedbrowser.js',
              'node_modules/bootstrap/js/collapse.js',
              'node_modules/bootstrap/js/transition.js',
              'node_modules/bootstrap/js/dropdown.js',
              'node_modules/bootstrap/js/modal.js',
              'node_modules/slick-carousel/slick/slick.js',
              'node_modules/highcharts/highcharts.js',
              'node_modules/odometer/odometer.js',
              'js/main.js'
            ],
        dest: 'dist/js/build.js'
      },
      css: {
        src: [
              'css/bootstrap-custom.css',
              'node_modules/outdated-browser/outdatedbrowser/outdatedbrowser.css',
              'node_modules/slick-carousel/slick/slick.css',
              'node_modules/odometer/themes/odometer-theme-default.css',
              'css/navizor-icon-font.css',
              'css/main.css'
            ],
        dest: 'dist/css/build.css'
      }
    },
    cssmin: {
      build: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'dist/css/build.min.css': ['dist/css/build.css']
        }
      }
    },
    uglify: {
      build: {
        src: ['dist/js/build.js'],
        dest: 'dist/js/build.min.js'
      }
    },
    imagemin: {
      build: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img/'
        }]
      }
    },
    webfont: {
      icons: {
        src: 'img/font/*.svg',
        dest: 'dist/fonts',
        destCss: 'css',
        options: {
          engine: 'node',
          hashes: false,
          font: 'navizor-icon-font',
          relativeFontPath: 'fonts/',
          htmlDemo: true,
          destHtml: 'dist/'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      main: {
        expand: true,
        flatten: true,
        src: 'dist/css/build.css',
        dest: 'dist/css'
      },
    },
    comboall: {
      main: {
        files: {
          'dist/index.html': ['index.html'],
        },
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.min.html': 'dist/index.html'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'node_modules/jquery/dist', src: '**', dest: 'dist/js/jquery'},
        ],
      },
    },
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat:js', 'uglify'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['css/*.css'],
        tasks: ['concat:css', 'autoprefixer', 'cssmin', 'comboall', 'htmlmin'],
        options: {
          spawn: false,
        },
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less', 'concat:css', 'autoprefixer', 'cssmin', 'comboall', 'htmlmin'],
        options: {
          spawn: false,
        },
      },
      webfont: {
        files: ['img/font/*.svg'],
        tasks: ['webfont', 'concat:css', 'autoprefixer', 'cssmin', 'comboall', 'htmlmin'],
        options: {
          spawn: false,
        },
      },
      img: {
        files: ['img/**'],
        tasks: ['newer:imagemin:build'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['*.html'],
        tasks: ['comboall', 'htmlmin'],
        options: {
          spawn: false,
        },
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'css/*.css',
            'js/*.js',
            'dist/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './dist/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combo-html-css-js');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less', 'concat', 'autoprefixer', 'cssmin', 'uglify', 'newer:imagemin:build', 'webfont', 'comboall', 'htmlmin', 'copy']);
  grunt.registerTask('serve', ['browserSync', 'watch']);

};