module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: process.env.PORT || 8000
      },
      prod: {
        options: {
          keepalive: true
        }
      },
      dev: {},
    },

    watch: {
      css: {
        files: ['Gruntfile.js', 'src/css/*', 'src/js/*', 'src/js/vendor/*'],
        tasks: ['less:dev', 'jshint', 'uglify:dev'],
      }
    },

    less: {
      dev: {
        files: {
          'src/build/app.css': 'src/css/app.less',
        },
        options: {
          compress: false,
        },
      },
      prod: {
        files: {
          'src/build/app.css': 'src/css/app.less',
        },
        options: {
          compress: true,
        },
      }
    },


    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js']
    },

    uglify: {
      dev: {
        src: [
          'src/js/vendor/jquery-3.1.1.js',
          'src/js/vendor/*.js',
          'src/js/*.js'
        ],
        dest: 'src/build/app.js',
        options: {
          beautify: true,
        }
      },
      prod: {
        files: {
          'src/build/app.js': 'src/js/app.js',
        },
      }
    },

  });


  grunt.registerTask('default', [
    'less:dev',
    'jshint',
    'uglify:dev',
    'connect:dev',
    'watch:css',
  ]);

  grunt.registerTask('prod', [
    'less:prod',
    'uglify:prod',
    'connect:prod',
  ]);
};
