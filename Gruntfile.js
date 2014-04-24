module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	var paths = {
		relativeDev : '',
		relativeBuild : ''
	};

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		paths: paths,


		compass: {
			options: {
				httpPath: '/',
				cacheDir: 'app/.tmp/.cache',
				sassDir: 'app/sass',
				cssDir: 'app/.tmp/',
				outputStyle: 'expanded',
				noLineComments: true,
				imagesDir: 'app/img',
				fontsDir: 'app/fonts',
				httpImagesPath: '.tmp/img',
				httpGeneratedImagesPath: '/img',
				generatedImagesDir: 'app/.tmp',
			},
			dev: {
				options: {
					httpPath: '<%= paths.relativeDev %>/',
					httpGeneratedImagesPath: '<%= paths.relativeDev %>/.tmp',
					httpFontsPath: '<%= paths.relativeDev %>/fonts'
				}
			},
			build: {
				options: {
					httpPath: '<%= paths.relativeBuild %>/',
					cacheDir: '.tmp/.cache',
					generatedImagesDir: 'build/img',
					httpGeneratedImagesPath: '<%= paths.relativeBuild %>/img',
					httpImagesPath: '/img',
					outputStyle: 'compressed',
					cssDir: '.tmp/.tmp',
					httpFontsPath: '<%= paths.relativeBuild %>/css/fonts'
				}
			}
		},
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: 'app/img',
					src: ['*.{png,jpg,gif}'],
					dest: 'build/img',
				}]
			},
			sprites: {
				files: [{
					expand: true,
					cwd: '.tmp/img',
					src: ['*.{png,jpg,gif}'],
					dest: 'build/img',
				}]
			}
		},

		link_html: {
			dev: {
				jsFiles: ['js/{,*/}*.js'],
				cssFiles: ['.tmp/*.css'],
				targetHtml: ['{,*/}*.html'],
				options: {
					cwd: 'app'
				}
			}
		},

		copy: {
			fonts: {
				expand: true,
				cwd: 'app/',
				src: 'fonts/*',
				dest: 'build/css/',
			},
			html: {
				expand: true,
				dot: true,
				cwd: 'app/',
				src: [
					'**',
					'!fonts/**',
					'!img/**',
					'!js/**',
					'!sass/**',
					'!.tmp/**',
					'!css/**',
					'!bower_components/**'
				],
				dest: 'build/',
			},
		},

		bowerInstall: {
			app: {
				src: [ 'app/{,*/}*.html' ],
			},
			sass: {
				src: ['app/sass/{,*/}*.{scss,sass}'],
				ignorePath: 'app/bower_components/'
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			main: {
				src:  'app/js/{,*/}*.js',
				dest: '.tmp/scripts.js'
			}
		},

		uglify: {
			build: {
				src: '.tmp/scripts.js',
				dest: 'build/js/main.min.js'
			}
		},

		clean: {
			tmp: {
				src: [".tmp/"]
			},
			dev: {
				src: [".tmp/", "app/.tmp/", ".sass-cache/"]
			},
			build: {
				src: ["build/"]
			}
		},

		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['bowerInstall']
			},
			scripts: {
				files: ['app/js/{,*/}*.js'],
				tasks: ['link_html:dev'],
				options: {
					spawn: false,
					interrupt: true
				}
			},
			compass: {
				files: ['app/sass/{,*/}*.{scss,sass}'],
				tasks: ['compass:dev', 'autoprefixer:dev'],
				options: {
					spawn: false
				}
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'app/{,*/}*.html',
					'app/js/{,*/}*.js',
					'app/.tmp/{,*/}*.css',
					'app/.tmp/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'app/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		prettify: {
			options: {
				indent: 1,
				indent_char: '	',
				brace_style: 'expand',
				unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
			},
			build: {
				expand: true,
				cwd: 'build',
				ext: '.html',
				src: ['*.html'],
				dest: 'build/'
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				globals: {
					jQuery: true,
					$: true
				},
			},
			files: {
				src: ['app/js/{,*/}*.js']
			}
		},

		useminPrepare: {
			html: 'app/index.html',
			options: {
				dest: 'build',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		usemin: {
			html: ['build/{,*/}*.html'],
			css: ['build/css/{,*/}*.css'],
			options: {
				assetsDirs: ['build']
			}
		},

		cssmin: {
			options: {
				root: 'app'
			}
		},

		"bower-install-simple": {
			options: {
				color: true,
				production: false,
				directory: "app/bower_components"
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			dev: {
				files: [{
					expand: true,
					cwd: 'app/.tmp',
					src: '{,*/}*.css',
					dest: 'app/.tmp/'
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd: '.tmp/.tmp',
					src: '{,*/}*.css',
					dest: '.tmp/.tmp'
				}]
			}
		},

		connect: {
			options: {
				port: 9000,
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'app',
						'app/.tmp'
					]
				}
			}
		},

		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/js',
					src: '*.js',
					dest: '.tmp/concat/js'
				}]
			}
		}

	});

	grunt.registerTask('server', function () {
		grunt.task.run([
			'clean:dev',
			"bower-install-simple",
			'bowerInstall',
			'compass:dev',
			'autoprefixer:dev',
			'link_html',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('default', [
		'clean:dev',
		"bower-install-simple",
		'compass:dev',
		'autoprefixer:dev',
		'link_html',
		'bowerInstall',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:build',
		"bower-install-simple",
		'compass:build',
		'autoprefixer:build',
		'bowerInstall',
		'link_html',
		'useminPrepare',
		'imagemin',
		'jshint',
		'concat',
		"ngmin",
		'uglify',
		'cssmin',
		'copy',
		'prettify',
		'usemin',
		'clean:tmp'
	]);

};
