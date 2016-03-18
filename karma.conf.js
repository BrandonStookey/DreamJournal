// Karma configuration
// Generated on Mon Jun 30 2014 19:35:20 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // angular source    
      'public/client/assets/libs/angular/angular.js',
      'public/client/assets/libs/angular-route/angular-route.js',
      "public/client/assets/libs/angular-sanitize/angular-sanitize.min.js",      
      'public/client/assets/libs/angular-mocks/angular-mocks.js',


      //auth0 source
      'http://code.angularjs.org/1.2.16/angular-cookies.min.js',
      'http://cdn.auth0.com/js/lock-8.2.min.js',      
      'http://cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js',
      'http://cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js',
      'http://cdn.auth0.com/w2/auth0-angular-4.js',

      //textAngular source(text editing tool box)
      // 'public/client/assets/libs/textAngular/dist/textAngular.css',
      // 'public/client/assets/libs/textAngular/dist/textAngular-rangy.min.js',
      // 'public/client/assets/libs/textAngular/dist/textAngular-sanitize.min.js',
      // 'public/client/assets/libs/textAngular/dist/textAngular.min.js',

      'public/client/assets/libs/textAngular/dist/textAngular.css',
      'public/client/assets/libs/rangy/rangy-core.js',
      'public/client/assets/libs/rangy/rangy-selectionsaverestore.js',
      'public/client/assets/libs/textAngular/dist/textAngular-sanitize.min.js',
      'public/client/assets/libs/textAngular/dist/textAngular.min.js',

      //d3 for graphs
      'http://d3js.org/d3.v3.min.js',



      // our app code
      'public/client/app/**/*.js',

      // our spec files
      'node_modules/expect.js/index.js',
      'test/appRoutesTest.js',
      'test/loginControllerTest.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // 'public/client/assets/libs/textAngular/dist/textAngular.css': [ 'browserify' ],
      // 'public/client/assets/libs/rangy/rangy-core.js': [ 'browserify' ],
      // 'public/client/assets/libs/rangy/rangy-selectionsaverestore.js': [ 'browserify' ],
      // 'public/client/assets/libs/textAngular/dist/textAngular-sanitize.min.js': [ 'browserify' ],
      // 'public/client/assets/libs/textAngular/dist/textAngular.min.js': [ 'browserify' ],

      // 'public/client/app/**/*.js': [ 'browserify' ],
      // 'test/appRoutesTest.js': [ 'browserify' ],
      // 'test/loginControllerTest.js': [ 'browserify' ]      
    },

    browserify: {
      debug: true,
    },

    // list of files to exclude
    exclude: [
        'karma.conf.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan','unicorn'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
