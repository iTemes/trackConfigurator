const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');
// Использование пакета dotenv для чтения переменных из файла .env в Node
require('dotenv').config();

const livePort = process.env.LIVE_RELOAD_PORT;

module.exports = {
    mode: 'development',
    entry: {
        menu_admin: '@/menu-admin.js', // админка для заказов
        product_filter: '@/product_filter.js', // фильтр продуктов на основе /catalog/api/subproduct-tag/2795/?format=api&offset=20
        track_configurator: '@/track_configurator/main.js', // конфигуратор Infinity
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                ],
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, './'),
        },
    },

    plugins: [
        new VueLoaderPlugin(),
        new LiveReloadPlugin({
            port: livePort,
            appendScript: true,
        }),
    ],

    watchOptions: {
        aggregateTimeout: 100,
        poll: 300,
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../static/build/admin/'),
    },
};
