/*
 * gruntfile.js
 */


module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var target = [
        "src/object.js",
        "src/string.js",
        "src/number.js",
        "src/array.js",
        "src/function.js",
        "src/math.js",
        "src/date.js",
    ];
    var banner = '\
/*\n\
 * high.js <%= version %>\n\
 * http://github.com/phi-jp/high\n\
 * MIT Licensed\n\
 * \n\
 * Copyright (C) 2010 phi, http://tmlife.net\n\
 */\n\
';

    grunt.initConfig({
        version: pkg.version,
        buildDir: ".",

        concat: {
            tmlib: {
                src: target,
                dest: '<%= buildDir %>/high.js',
                options: {
                    banner: banner
                }
            },
        },
        uglify: {
            tmlib: {
                options: {
                },
                files: {
                    '<%= buildDir %>/high.min.js': [ '<%= buildDir %>/high.js' ]
                },
            },
        },
        shell: {
            docs: {
                command: 'jsduck ./src --output ./docs --title "high docs"',
                options: {
                    stdout: true,
                    callback: function(err, stdout, stderr, cb) {
                        console.log(err);
                        console.log(stdout);
                        console.log(stderr);
                        console.log(cb);
                    },
                },
            },
        }
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('docs', ['shell:docs']);
};

