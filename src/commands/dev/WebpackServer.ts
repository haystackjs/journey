import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebPack from 'html-webpack-plugin';
import { loadConfig } from '../config';
import path from 'path';
import fs from 'fs';

export function startWebpackServer(root: string, name: string) {
    const journeyConfig = loadConfig(root);
    const aliases = {};
    for (let m of journeyConfig.modules) {
        aliases[m] = path.resolve(root, 'packages', m);
    }

    let webpackConfig: webpack.Configuration = {
        target: 'web',
        mode: 'development',
        entry: path.resolve(root, 'packages', name, 'index.tsx'),
        output: {
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, cacheCompression: false,
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        },
                    },
                },
            ]
        },
        resolve: {
            alias: aliases,
            extensions: ['.js', '.ts', '.tsx', '.jsx']
        },
        plugins: [new HtmlWebPack({
            template: path.resolve(root, 'packages', name, 'index.html')
        })]
    };

    // Patch webpack config
    let config = path.resolve(root, 'packages', name, 'journey.conf.js');
    if (fs.existsSync(path.resolve(root, 'packages', name, 'journey.conf.js'))) {
        let cfg = require(config);
        if (cfg && cfg.webpack) {
            webpackConfig = cfg.webpack(webpackConfig);
        }
    }

    // Start Server
    let compiler = webpack(webpackConfig);
    const devServerOptions: WebpackDevServer.Configuration = {
        open: true,
        stats: {
            colors: true,
        },
        historyApiFallback: true
    };
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(4000, '127.0.0.1', () => {
        console.log('Starting server on http://localhost:4000');
    });
}