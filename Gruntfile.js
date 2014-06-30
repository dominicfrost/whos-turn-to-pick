module.exports = function(grunt) {
    require('wf-grunt').init(grunt, {
        options: {
            requireConfig: {
                paths: {
                    'lunch-picker': './src'
                }
            }
        }
    });
};


