var _browsers;

if (process.env.CONTINUOUS_INTEGRATION) {
    // Travis CI only supports Firefox, eventually should use saucelabs
    _browsers = ['Firefox'];
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
