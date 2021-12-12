export const defaultTitle = 'BotBlock';
export const defaultDesc = 'The single source for all Discord bot lists. Simplify sending your bot\'s guild count with the BotBlock API. Make a single call to send your guild count to all supported lists, or fetch list data and build your own automation.';
export const defaultKeywords = Object.freeze([
    'botblock', 'discord', 'bot', 'discord bot', 'api', 'bot api', 'bot list', 'bot list api', 'botlist', 'botlist api',
    'guilds', 'bot guild count', 'discord bot api',
]);

export default (meta, context) => {
    // Get meta title
    let contextTitle = meta.title || '';
    if (typeof contextTitle === 'function') { contextTitle = contextTitle(context); }
    const pageTitle = `${contextTitle}${contextTitle ? ' - ' : ''}${defaultTitle}`;

    // Get meta desc
    let contextDesc = meta.desc || '';
    if (typeof contextDesc === 'function') { contextDesc = contextDesc(context); }
    const pageDesc = `${contextDesc}${contextDesc ? ' - ' : ''}${defaultDesc}`;

    // Get meta keywords
    let contextKeywords = meta.keywords || [];
    if (typeof contextKeywords === 'function') { contextKeywords = contextKeywords(context); }
    const pageKeywords = contextKeywords.concat(defaultKeywords).join(', ');

    // Get base & page URL
    const pageUrl = 'https://botblock.org' + context.$route.path;

    return {
        title: pageTitle,
        meta: [
            { hid: 'title', name: 'title', content: pageTitle },
            { hid: 'description', name: 'description', content: pageDesc },
            { hid: 'keywords', name: 'keywords', content: pageKeywords },

            { hid: 'twitter:title', name: 'twitter:title', content: pageTitle },
            { hid: 'twitter:description', name: 'twitter:description', content: pageDesc },

            { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: pageTitle },
            { hid: 'og:description', prefix: 'og: http://ogp.me/ns#', property: 'og:description', content: pageDesc },
            { hid: 'og:url', prefix: 'og: http://ogp.me/ns#', property: 'og:url', content: pageUrl },
        ],
        link: [
            { hid: 'canonical', rel: 'canonical', href: pageUrl },
        ],
    };
};
