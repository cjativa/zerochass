const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const serverConfig = {
    mode: 'development',

    entry: {
        app: './server/app.tsx'
    },

    node: {
        __filename: false,
        __dirname: false,
        fs: 'empty'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/, use: [
                    {
                        loader: MiniCssExtractPlugin.loader, options: { publicPath: path.resolve('assets', '/'), path: path.resolve(__dirname, 'dist/assets'), }
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }
        ]
    },

    target: 'node',
    output: {
        publicPath: path.resolve('assets', '/'),
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    externals: {
        // Possible drivers for knex - we'll ignore them
        sqlite3: 'sqlite3',
        mysql2: 'mysql2',
        mariasql: 'mariasql',
        mysql: 'mysql',
        mssql: 'mssql',
        oracle: 'oracle',
        'strong-oracle': 'strong-oracle',
        oracledb: 'oracledb',
        tedious: 'tedious',
        'pg-query-stream': 'pg-query-stream',
        'mssql/lib/base': 'mssql/lib/base',
        'mssql/package.json': 'mssql/package.json'
    },
    plugins: [
        new webpack.IgnorePlugin(/^pg-native$/),
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        }),
        new MiniCssExtractPlugin({

        })
    ]
};

const clientConfig = {

    mode: 'production',
    node: {
        fs: 'empty'
    },

    entry: {
        client: './src/index.tsx',
    },

    output: {
        publicPath: path.resolve('assets', '/'),
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'bundle.js'
    },


    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",


    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        })],


    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }
        ]
    },
};

module.exports = [serverConfig, clientConfig];

