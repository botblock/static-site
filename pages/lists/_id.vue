<template>
    <div>
        <Nav />
        <div class="container">
            <div class="hero">
                <div>
                    <h1>{{ list.name }}</h1>
                    <p>{{ list.description }}</p>
                    <p>Added: {{ formatDate(list.added) }}</p>
                </div>
                <List
                    :list="list"
                    hide-information-link
                />
            </div>
        </div>
        <div class="container">
            <div class="items">
                <div>
                    <h3>Primary Language</h3>
                    <div class="text">
                        <FA
                            :icon="icons.faLanguage"
                            role="img"
                            aria-hidden="true"
                        />
                        <p>{{ list.language }}</p>
                    </div>
                </div>
                <div>
                    <h3>Owners</h3>
                    <div class="text">
                        <FA
                            :icon="icons.faUserFriends"
                            role="img"
                            aria-hidden="true"
                        />
                        <p>{{ list.owners || 'Unknown' }}</p>
                    </div>
                </div>
                <div v-if="list.discord_only">
                    <h3>Discord Only</h3>
                    <div class="text">
                        <FA
                            :icon="icons.faDiscord"
                            role="img"
                            aria-hidden="true"
                        />
                        <p>
                            This list is for Discord bots only
                        </p>
                    </div>
                </div>
                <div v-else>
                    <h3>Multiple Platforms</h3>
                    <div class="text">
                        <FA
                            :icon="icons.faRobot"
                            role="img"
                            aria-hidden="true"
                        />
                        <p>
                            This list includes bots for multiple platforms
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="items nowrap">
                <div>
                    <h3>API Information</h3>

                    <template v-if="!list.api_docs && !list.api_post && !list.api_field && !list.api_get">
                        <p>
                            Unfortunately, <b>this list has no known API</b> tracked by BotBlock.
                            Due to this, this list is not included in the
                            <NuxtLink to="/docs#post-api-count">
                                guild count API endpoint
                            </NuxtLink>, or the
                            <NuxtLink to="/docs#get-api-bots-id">
                                bot information API endpoint
                            </NuxtLink>.
                        </p>
                        <p>
                            Incorrect? We rely on the community to keep out list information up-to-date, and we welcome
                            contributions to update <a
                                href="/github/data"
                                target="_blank"
                            >our open data</a>.
                        </p>
                    </template>
                    <template v-else>
                        <template v-if="list.api_post && list.api_field">
                            <p>
                                This list has a POST endpoint for bot build counts, and <b>is supported by the BotBlock
                                    <NuxtLink to="/docs#post-api-count">guild count API</NuxtLink></b>. Using the BotBlock
                                API call allows bot developers to make a single POST call to send their bot guild count
                                to all lists supported by BotBlock.
                            </p>
                            <p>
                                If not using the BotBlock API, the direct list endpoint is
                                <code>{{ list.api_post }}</code> and expects the <code>{{ list.api_field }}</code> to be
                                set with the bot guild count.
                            </p>
                            <p>
                                In addition to the main field for the guild count, this list also provides the following
                                support for shard-specific fields:
                            </p>
                            <ul>
                                <li>
                                    <code>shard_id</code>:
                                    <template v-if="list.api_shard_id">
                                        Yes, as <code>{{ list.api_shard_id }}</code>
                                    </template>
                                    <template v-else>
                                        No
                                    </template>
                                </li>
                                <li>
                                    <code>shard_count</code>:
                                    <template v-if="list.api_shard_count">
                                        Yes, as <code>{{ list.api_shard_count }}</code>
                                    </template>
                                    <template v-else>
                                        No
                                    </template>
                                </li>
                                <li>
                                    <code>shards</code>:
                                    <template v-if="list.api_shards">
                                        Yes, as <code>{{ list.api_shards }}</code>
                                    </template>
                                    <template v-else>
                                        No
                                    </template>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            Unfortunately, this list does not have a POST endpoint for bot guild counts, and as such,
                            is not supported by the BotBlock
                            <NuxtLink to="/docs#post-api-count">
                                guild count API endpoint
                            </NuxtLink>.
                        </template>

                        <template v-if="list.api_docs">
                            <p>
                                This list has API docs covering their specific endpoints available to access at
                                <a
                                    :href="list.api_docs"
                                    target="_blank"
                                    rel="noopener"
                                >{{ list.api_docs }}</a>.
                            </p>
                        </template>

                        <template v-if="list.api_get">
                            <p>
                                This list provides an API endpoint to fetch information about bots published on the
                                list, and <b>is supported as part of the BotBlock
                                    <NuxtLink to="/docs#get-api-bots-id">bot information API endpoint</NuxtLink></b>. The
                                direct list endpoint is <code>{{ list.api_get }}</code>.
                            </p>
                        </template>

                        <template v-if="list.view_bot || list.bot_widget">
                            <p>
                                Additionally, the following URLs are known for this list:
                            </p>
                            <ul>
                                <li v-if="list.view_bot">
                                    Viewing a bot on the list: <code>{{ list.view_bot }}</code>
                                </li>
                                <li v-if="list.bot_widget">
                                    Accessing a widget for a bot: <code>{{ list.bot_widget }}</code>
                                </li>
                            </ul>
                        </template>
                    </template>
                </div>
                <div>
                    <h3>List Features</h3>
                    <Feature
                        v-for="feature in list.features"
                        :key="feature.id"
                        :feature="feature"
                        small
                    />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>


<style scoped lang="scss">
@import '../../scss/globals';

.hero {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 2rem 0;

    > * {
        flex-basis: 100%;

        @media (min-width: $tablet) {
            flex-basis: 50%;
        }
    }

    h1 {
        margin: 0 0 .5rem;
    }

    p {
        margin: 1rem 0;
        color: rgba($light, .75);

        &:first-of-type {
            position: relative;
            font-size: 1.25rem;
            line-height: 1.25;
            font-weight: $weight-bold;
            color: $light;
            padding: 0 0 0 1.5rem;

            &::before {
                content: '';
                display: block;
                position: absolute;
                height: 100%;
                width: .125rem;
                background: $brand;
                left: .5rem;
            }
        }
    }
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;

    &.nowrap {
        @media (min-width: $tablet) {
            flex-wrap: nowrap;
        }
    }

    > * {
        margin: 1rem;
        flex-grow: 1;

        h3 {
            color: $brand;
            font-size: 2rem;
            margin: 0 0 .5rem;
        }

        .text {
            display: flex;
            align-items: center;
            margin: 0 0 .5rem;

            > svg {
                margin: 0 .5rem 0 0;
            }

            > p {
                margin: 0;
            }
        }
    }
}
</style>

<script>
import { faLanguage, faUserFriends, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import getList from '../../util/getList';
import generateHead from '../../util/generateHead';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import List from '../../components/list';
import FA from '../../components/fa';
import Feature from '../../components/feature';

export default {
    components: {
        Nav,
        Footer,
        List,
        FA,
        Feature,
    },
    asyncData({ params, error }) {
        const list = getList(params.id);
        if (list) return { list };
        return error({ statusCode: 404, message: 'List not found' });
    },
    data() {
        return {
            list: {},
            icons: {
                faLanguage,
                faUserFriends,
                faRobot,
                faDiscord,
            },
        };
    },
    head() {
        return generateHead({
            title: data => `${data.list.name} - Bot Lists`,
            description: data => (data.list.description || '').trim(),
        }, this);
    },
    methods: {
        formatDate(timestamp) {
            return new Date(timestamp * 1000).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' });
        },
    },
};
</script>
