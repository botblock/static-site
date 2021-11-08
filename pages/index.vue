<template>
    <div>
        <div class="hero">
            <Nav />
            <div class="container">
                <h1>BotBlock</h1>
                <p>The single source for all Discord bot lists.</p>
            </div>
        </div>
        <div class="cta">
            <div class="container">
                <div>
                    <h2>BotBlock API</h2>
                    <p>Use the BotBlock API to simplify sending your bot guild count to multiple lists, and more.</p>
                </div>
                <NuxtLink to="/docs">Read the docs</NuxtLink>
            </div>
        </div>
        <div class="lists">
            <div class="container">
                <h2>Bot Lists</h2>
                <List :list="list" :key="list.id" v-for="list in lists"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.hero {
    .container {
        padding: 5rem 0;
    }
}

.cta {
    background: $blue-dark;
    padding: 1rem 0;
    margin: 1rem 0;

    .container {
        display: flex;
        align-items: center;

        h2 {
            font-size: 2rem;
            margin: 0 0 .25rem;
        }

        p {
            font-size: 1.25rem;
            margin: 0;
        }

        a {
            padding: .5rem 1rem;
            margin: 0 0 0 auto;
            border-radius: .25rem;
            background: $dark;
            color: $light;
            text-decoration: none;
            font-size: 1rem;
        }
    }
}

.lists {
    .container {
        display: flex;
        flex-wrap: wrap;

        h2 {
            flex-basis: 100%;
            font-size: 1.5rem;
            margin: 1rem 0 .5rem;
        }

        .list {
            flex-basis: 100%;

            @media (min-width: 550px) {
                flex-basis: 50%;
            }
        }
    }
}
</style>

<script>
import getLists from '../util/getLists';
import getList from '../util/getList';
import Nav from '../components/nav';
import List from '../components/list';

export default {
    components: {
        Nav,
        List,
    },
    data() {
        return {
            lists: getLists()
                .filter(list => !list.defunct)
                .map(list => getList(list.id)),
        };
    },
};
</script>
