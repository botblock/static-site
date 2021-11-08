const fs = require('fs');
const path = require('path');

const jsonData = dir => fs.readdirSync(path.join(__dirname, 'data', 'data', dir))
    .map(file => file.match(/^(.+)\.json$/)[1])
    .filter(file => !!file);

module.exports = {
    target: 'static',
    css: [ 'modern-normalize' ],
    generate: {
        fallback: '404.html',
        routes: [
            ...jsonData('lists').map(list => `/lists/${list}`),
            ...jsonData('features').map(feature => `/features/${feature}`),
        ],
    },
};
