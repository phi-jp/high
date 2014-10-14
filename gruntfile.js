/*
 * gruntfile.js
 */


module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var target = [
        "src/array.js",
        "src/date.js",
        "src/function.js",
        "src/math.js",
        "src/number.js",
        "src/object.js",
        "src/string.js",
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
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['concat', 'uglify']);
};

