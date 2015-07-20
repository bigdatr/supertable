var webpack = require('webpack');
var _browsers;

if (process.env.CONTINUOUS_INTEGRATION) {
    // For Travis CI
    _browsers = ['Firefox'];
}
else {
    _browsers = ['Chrome', 'Firefox'];
}

module.exports = function(config) {
    config.set({
        browsers: _browsers,
        frameworks: ['jasmine'],
        files: ['tests.webpack.js'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress', 'dots', 'coverage'],
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true,
        autoWatch: false,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.jsx$/, loader: 'babel-loader' },
                    { test: /\.js$/, loader: 'babel-loader' }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        }
    });
};
