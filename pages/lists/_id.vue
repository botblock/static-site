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
                <List :list="list" hide-information-link />
            </div>
        </div>
        <div class="container">
            <div class="items">
                <div>
                    <h3>Primary Language</h3>
                    <div>
                        <FA :icon="icons.faLanguage" />
                        <p>{{ list.language }}</p>
                    </div>
                </div>
                <div>
                    <h3>Owners</h3>
                    <div>
                        <FA :icon="icons.faUserFriends" />
                        <p>{{ list.owners || 'Unknown' }}</p>
                    </div>
                </div>
                <div v-if="list.discord_only">
                    <h3>Discord Only</h3>
                    <div>
                        <FA :icon="icons.faDiscord" />
                        <p>
                            This list is for Discord bots only
                        </p>
                    </div>
                </div>
                <div v-else>
                    <h3>Multiple Platforms</h3>
                    <div>
                        <FA :icon="icons.faRobot" />
                        <p>
                            This list includes bots for multiple platforms
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- TODO: features -->
        <!-- TODO: api information + bot/widget links -->
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

    > * {
        margin: 1rem;
        flex-grow: 1;

        h3 {
            color: $brand;
            font-size: 2rem;
            margin: 0 0 .5rem;
        }

        > div {
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
import { faLanguage, faUserFriends, faRobot } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import getList from '../../util/getList';
import Nav from '../../components/nav';
import List from '../../components/list';
import FA from '../../components/fa';
import Footer from "../../components/footer";

export default {
    components: {
        Footer,
        Nav,
        List,
        FA,
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
    methods: {
        formatDate(timestmap) {
            return new Date(timestmap * 1000).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' });
        },
    },
};
</script>
