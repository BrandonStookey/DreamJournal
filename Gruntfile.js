module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngAnnotate: {
        demo: {
            files: {
                'public/client/dist/WithAnnotationsCtrl.js': ['public/client/app/**/*.js' ]
            },
        }
    },    

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    jshint: {
      files: [
        'server/**/*.js',
        'public/client/**/*.js'
      ],
      options: {
        jshintrc: '_.jshintrc',
        ignores: [
          'public/client/assets/libs/**/*.js',
          'public/client/assets/js/**/*.js',
          'public/client/dist/**/*.js',
        ],
        force: false
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },    

    watch: {
      scripts: {
        files: [
          'server/**/*.js',
          'public/client/**/*'
        ],
        tasks: [
          'build', 
          'test'
        ]
      },
      dev: {
        files: [
          'public/client/**/*.js',
          'public/client/**/*.html',
          'public/client/**/*.scss',
          '!public/client/dist/**/*',
          '!.min.css',
          '!.min.js'
        ],
        tasks: [
          'build'
        ]
      }
    },

    cssmin: {
      options: {
        sourceMap: true,
        target: 'public/client/dist'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'public/client/assets/css/',
            src: ['*.css', '!.min.css'],
            dest: 'public/client/dist',
            ext: '.min.css'
          }
        ]
      }
    },

    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   app: {
    //     src: [
    //       'public/client/app/**/*.js'
    //     ],
    //     dest: 'public/client/dist/app.js'
    //   }
    // },

    uglify: {
      scripts: {
        files: {
          // 'public/client/dist/app.min.js': ['public/client/dist/app.js']
          'public/client/dist/WithAnnotationsCtrl.min.js': ['public/client/dist/WithAnnotationsCtrl.js']          
        },
        options: {
          sourceMap: "true"
        }
      }
    },
    shell: {
      prodServer: {
        command: [
            'git add .',
            'git commit -m "Pushing to production"',
            'git push heroku master'
        ].join('&&')
      }
    },    

  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-ng-annotate');  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');  




  grunt.registerTask('build', ['ngAnnotate', 'uglify','cssmin', 'jshint' ]);
  
  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('production')) {
      console.log("Pushing to production!"),
      // upload to heroku
      grunt.task.run(['shell:prodServer']);
    } 
  });

  grunt.registerTask('deploy', [
    // 'test',
    'build',
    'upload'
  ]);  
 
  grunt.registerTask('heroku:production', 'build');


};
