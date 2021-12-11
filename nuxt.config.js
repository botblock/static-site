const fs = require('fs');
const path = require('path');

const jsonData = dir => fs.readdirSync(path.join(__dirname, 'data', 'data', dir))
    .map(file => file.match(/^(.+)\.json$/)[1])
    .filter(file => !!file);

module.exports = {
    target: 'static',
    head: {
        htmlAttrs: { lang: 'en' },
        title: 'BotBlock',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },

            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'theme-color', content: '#29a3d0' },

            { hid: 'title', name: 'title', content: 'BotBlock' },
            { hid: 'description', name: 'description', content: 'BotBlock' },
            { hid: 'keywords', name: 'keywords', content: 'BotBlock' },

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@BlockBotOrg' },
            { name: 'twitter:creator', content: '@MattIPv4' },
            { hid: 'twitter:title', name: 'twitter:title', content: 'BotBlock' },
            { hid: 'twitter:description', name: 'twitter:description', content: 'BotBlock' },
            { name: 'twitter:image', content: '/header.png' },
            { name: 'twitter:image:alt', content: 'BotBlock header image' },

            { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: 'BotBlock' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:type', content: 'website' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:locale', content: 'en_GB' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:site_name', content: 'BotBlock' },
            { hid: 'og:description', prefix: 'og: http://ogp.me/ns#', property: 'og:description', content: 'BotBlock' },
            { hid: 'og:url', prefix: 'og: http://ogp.me/ns#', property: 'og:url', content: 'https://botblock.org' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:image', content: '/header.png' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:image:alt', content: 'BotBlock header image' },
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/icon.png' },
            { rel: 'shortcut-icon', type: 'image/png', href: '/icon.png' },
            { rel: 'apple-touch-icon', type: 'image/png', href: '/icon.png' },
            { hid: 'canonical', rel: 'canonical', href: 'https://botblock.org' },
        ],
    },
    loading: { color: '#29a3d0' },
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
