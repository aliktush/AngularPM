module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        
        
		uglify: {
			options: {
				compress: true,
				mangle: true
			},
			app: {
				src: './public/dist/app.js',
				dest: './public/dist/app.js'
			},
			libs: {
				src: './public/dist/libs.js',
				dest: './public/dist/libs.js'
			}
		},
        
        
		concat: {
			libs: {
				src: [

                    './bower_components/jquery/dist/jquery.js',

                    './bower_components/angular/angular.js',

                    './bower_components/angular-ui-router/release/angular-ui-router.js',

					'./bower_components/angular-animate/angular-animate.min.js',

					'./bower_components/angular-sanitize/angular-sanitize.js',

					'./bower_components/ui-bootstrap-tpls.min.js',

					'./bower_components/bootstrap/dist/js/bootstrap.js',

                    './bower_components/angular-cookies/angular-cookies.js',

                    //'./bower_components/ui-bootstrap-modal-0.10.0.min.js',

                    
					
				],
				dest: './public/dist/libs.js'
			},
		},
        
        
		browserify: {
			app: {
				options: {
					browserifyOptions: {
						debug: true
					},
					plugin: [
                        [
                            'remapify', [
								{
									src: '**/*.js',
									expose: 'helpers',
									cwd: './app/helpers'
								},
								{
									src: '**/*.js',
									expose: 'services',
									cwd: './app/services'
								},
								{
									src: '**/*.js',
									expose: 'controllers',
									cwd: './app/controllers'
								},
                                {
                                	src: '**/*.js',
                                	expose: 'directives',
                                	cwd: './app/directives'
                                },
								{
                                    src: '**/*.js',
                                    expose: 'components',
                                    cwd: './app/components'
                                }
                            ]
                        ]
					]
				},
				files: {
					'./public/dist/app.js': './app/**/*.js'
				}
			}
		},
        
        
        
		clean: {
			app: ['./public/dist/app.js'],
			libs: ['./public/dist/libs.js']
		},
        
        
        
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			noProcess: {
				files: [
                    './app/**/*.html',
                    './*.html'
				],
                tasks:['app']
			},
			scripts: {
				files: [
				    //'./app/config/**/*.js',
                    //'./app/controllers/**/*.js',
                    //'./app/components/**/*.js',
                    //'./app/directives/**/*.js',
                    //'./app/helpers/**/*.js',
                    //'./app/services/**/*.js',
					//'./app/factories/**/*.js',
                    //'./app/filters/*.js',
                    //'./app/*.js'
                    './app/**/*.js'
				],
				tasks: ['app']
			},
			css: {
				files: ['./app/style/**/*.scss'],
				tasks: ['sass']
			}
		},
        
        
		sass: {
		    compile: {
		        options: {
		            outputStyle: 'compressed'
		        },
		        files: {
		            './public/dist/style.css': './app/style/compile.scss'
		        }
		    }
		},
        
        
		concat_css: {
			options: {
				// Task-specific options go here.
			},
			all: {
				src: ["./bower_components/libs/*.css"],
				dest: "./public/dist/libs.css"
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['app', 'libs', 'watch']);
	grunt.registerTask('app', ['clean:app', 'sass','concat_css', 'browserify:app']);
	grunt.registerTask('libs', ['clean:libs', 'concat:libs']);
	grunt.registerTask('release', ['libs', 'app', 'uglify']);
};