const path = require('path');
const cwd = process.cwd();

const isTestDebug = process.argv.some(arg => arg === '--auto-watch');

module.exports = config => {
    config.set({
        browsers: ['Chrome'],
        client: {
            jasmine: {
                random: false,
            },
            captureConsole: true,
            useIframe: true, 
        },
        colors: true,
    
        coverageReporter: {
            type: 'html',
            dir: path.resolve(cwd, 'coverage'),
            subdir: '.', 
            check: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                },
            },
            instrumenterOptions: {
                istanbul: { noCompact: true },
            },
        },
    
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
        
        mime: { 'text/x-typescript': ['ts', 'tsx'] },
    
        port: 9876,
    
        singleRun: true,

        basePath: cwd,

        files: ['test/unit/index.@(js|ts)'],
        preprocessors: {
            'test/unit/index.@(js|ts)': ['webpack', 'sourcemap'],
        },

        frameworks: [
            'jasmine', 'viewport', 'webpack'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-viewport', 'karma-sourcemap-loader', 'karma-webpack'
        ],

        logLevel: config.LOG_ERROR,

        webpackMiddleware: {
            logLevel: 'error',
        },
        webpack: {
            stats: 'errors-only',
            mode: 'development',
            devtool: 'inline-source-map',
            watch: isTestDebug,
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
                alias: {

                },
                symlinks: true,
                fallback: {
                    path: false, 
                },
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx|jsx)$/,
                        include: [
                            path.resolve(cwd, 'app'),
                            path.resolve(cwd, 'src'),
                            path.resolve(cwd, 'test'),
                        ],
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'ts-loader',
                                options: {
                                    compilerOptions: {
                                        declaration: false,
                                        noEmit: false,
                                    },
                                },
                            },
                        ],
                    }
                ],
                noParse: /typescript[\\/]lib[\\/]typescript\.js$/,
            },
            output: {
                pathinfo: false,
            },
            // resolveLoader: { modules: ['node_modules/gs-uitk-build/node_modules'] },
        },
    });
};
