<template>
    <h2>Discord Bot Lists? We have them all.</h2>
    <p>
        BotBlock is a home of <NuxtLink to="/lists">all bot lists for Discord bots</NuxtLink> as well as the centralised
        <NuxtLink to="/docs#post-api-count">guild count API</NuxtLink> and our other API endpoints.
    </p>
    <p>
        The aim of the site and project is to provide a central place for bot developers, and also normal Discord users,
        to discover all the possible sites where Discord bots are listed to give everyone the best chance of finding or
        promoting what they want. Further, through the BotBlock API, the project aims to make it as simple as possible
        for bot developers to ensure that their statistics are reflected on as many bot listing sites as possible.
    </p>

    <h2>A central API for bot stats</h2>
    <p>
        BotBlock provides a simple to use <NuxtLink to="/docs#post-api-count">central API for developers</NuxtLink> to
        post their bot's guild count to all bot lists that we have listed who support bot statistics on their site. This
        makes life easier for a bot developer as they don't have to worry about getting the API details for each list
        and then posting to every single list from within their bot. We handle the hard work, the bot developer just
        needs to post their stats to us.
    </p>
    <p>
        The <NuxtLink to="/docs">BotBlock API</NuxtLink> is built on
        <a href="https://workers.cloudflare.com/" target="_blank">Cloudflare Workers</a> and is
        <a href="/github/api" target="_blank">completely open-source</a>, allowing anyone to verify how we handle any
        data and authentication tokens passed to the API. BotBlock utilises no logging in the API, ensuring that we do
        not intentionally store any list API tokens that are POST-ed.
    </p>

    <h2>An open and neutral project</h2>
    <p>
        BotBlock has the aim of being an open and neutral project. As such, BotBlock is completely open-source and we
        welcome anyone to <a href="/github/data" target="_blank">suggest corrections</a> for details about any bot list
        on the site, or to <a href="/github/site" target="_blank">propose a new change</a> to be added to the site
        itself. We work closely with the community and bot list owners to ensure that list details are up to date.
    </p>
    <p>
        As part of our efforts to be transparent, BotBlock also keeps a record of all Discord bot lists that have
        shutdown. These are given the defunct flag and are hidden throughout the majority of the site, alongside being
        ignored in the POST guild count and GET lists API endpoints. These lists can be viewed on the dedicated
        <NuxtLink to="/lists/defunct">defunct lists page</NuxtLink>. Separately, some lists may be hidden from the main
        list on the website, though not ignored in the API, and can be found on the dedicated
        <NuxtLink to="/lists/hidden">hidden lists page</NuxtLink>.
    </p>

    <h2>Credits and thanks</h2>
    <p>
        The BotBlock website and API were developed by
        <a href="https://mattcowley.co.uk" target="_blank">Matt Cowley</a>, with help from
        <a href="https://github.com/DetectiveHuman" target="_blank">Jacob_#1234</a> and
        <a href="/discord" target="_blank">the wider community</a>.
    </p>
    <p>
        The <a href="/github/data" target="_blank">list data</a> utilised throughout BotBlock is maintained and curated
        by a dedicated team of individuals acting as moderators for BotBlock, based on suggestions submitted by many
        different <a href="/discord" target="_blank">members of the community</a>, which we continue to be incredibly
        grateful for.
    </p>
    <p>
        The icon used for BotBlock was created by Jet. The bot list icons are copyright their respective owners unless
        otherwise stated on their own sites.
    </p>
    <p>
        BotBlock is not affiliated with <a href="https://discord.com" target="_blank">Discord Inc</a>.
    </p>
</template>
