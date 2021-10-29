const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const universalRules = {
    'tsx': {
        test: /\.tsx$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/site'),
        ],
        use: 'ts-loader',
    }
}

const serverRules = {
    'scss': {
        test: /\.s[ac]ss$/i,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: 'resolve-url-loader',
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            },
        ],
    },
    'font': {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: [path.resolve(__dirname, 'src')],
        exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/site'),
        ],
        type: 'asset/resource',
    },
    'image': {
        test: /\.(png|jpg|jpeg|webp|gif)$/i,
        include: [path.resolve(__dirname, 'src')],
        exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/site'),
        ],
        type: 'asset/resource',
    },
    'svg': {
        test: /\.(svg)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/site'),
        ],
        type: 'asset/source',
    }
}

const clientConfig = {
    name: 'clientConfig',
    entry: './src/client.tsx',
    mode: 'production',
    target: 'web',
    output: {
        publicPath: 'public',
        filename: 'client.js',
        path: path.resolve(__dirname, 'public'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            universalRules['tsx'],
            serverRules['scss'],
            serverRules['font'],
            serverRules['image'],
            serverRules['svg'],
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new MiniCssExtractPlugin(),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true',
        }),
    ],
}

const serverConfig = {
    name: 'serverConfig',
    entry: './src/server.tsx',
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        publicPath: '/',
        filename: 'server.js',
        path: path.resolve(__dirname, 'public'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            universalRules['tsx'],
            serverRules['scss'],
            serverRules['font'],
            serverRules['image'],
            serverRules['svg'],
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false',
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/site', to: './' }],
        }),
    ],
}

const devConfig = {
    name: 'devConfig',
    entry: './src/devClient.tsx',
    mode: 'development',
    devtool: false,
    output: {
        filename: 'client.js',
        path: path.resolve(__dirname, 'dev'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dev'),
            watch: true,
        },
        historyApiFallback: true,
        compress: true,
        liveReload: false,
        hot: "only",
        port: 3000,
        open: true,
    },
    module: {
        rules: [
            universalRules['tsx'],
            {
                test: /\.s[ac]ss$/i,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                include: [path.resolve(__dirname, 'src')],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/site'),
                ],
                type: 'asset/inline',
            },
            {
                test: /\.(png|jpg|jpeg|webp|gif)$/i,
                include: [path.resolve(__dirname, 'src')],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/site'),
                ],
                type: 'asset/inline',
            },
            {
                test: /\.(svg)$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/site'),
                ],
                type: 'asset/source',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].js.map',
            exclude: ['/node_modules'],
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/site', to: './' }],
        }),
    ],
}

module.exports = [clientConfig, serverConfig, devConfig]