var _browsers;

if (process.env.CONTINUOUS_INTEGRATION) {
    // For Travis CI
    _browsers = ['Firefox', 'PhantomJS'];
}
else {
    _browsers = ['Chrome', 'PhantomJS', 'Firefox'];
}

module.exports = function(config) {
    config.set({
        browsers: _browsers,
        frameworks: ['jasmine'],
        files: ['tests.webpack.js'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true,
        autoWatch: false,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, loader: 'babel-loader' }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
