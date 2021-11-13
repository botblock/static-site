const fs = require('fs');
const path = require('path');

const jsonData = dir => fs.readdirSync(path.join(__dirname, 'data', 'data', dir))
    .map(file => file.match(/^(.+)\.json$/)[1])
    .filter(file => !!file);

module.exports = {
    target: 'static',
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
    },
    css: [ 'modern-normalize' ],
    buildModules: [ 'nuxt-resolve-url-loader' ],
    generate: {
        fallback: '404.html',
        routes: [
            ...jsonData('lists').map(list => `/lists/${list}`),
            ...jsonData('features').map(feature => `/features/${feature}`),
        ],
    },
    build: {
        extend(config) {
            config.module.rules.push({
                test: /\.ya?ml$/,
                type: 'json',
                use: 'yaml-loader',
            });
        },
    },
};
