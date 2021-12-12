<template>
    <div>
        <div class="hero">
            <Nav dark />
            <div class="container">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>
            </div>
        </div>
        <div class="lists">
            <div class="container">
                <List
                    v-for="list in listsOne"
                    :key="list.id"
                    :list="list"
                />
            </div>
        </div>
        <ApiCta v-if="showCta" />
        <div class="lists">
            <div class="container">
                <List
                    v-for="list in listsTwo"
                    :key="list.id"
                    :list="list"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';
@import '../scss/mixins';

.hero {
    background: $brand;
    color: $dark;
    margin: 0 0 2rem;

    .container {
        padding: 2rem 0;

        h1 {
            margin: 0 0 .5rem;
        }

        p {
            position: relative;
            font-size: 1.25rem;
            line-height: 1.25;
            font-weight: $weight-bold;
            padding: 0 0 0 1.5rem;

            &::before {
                content: '';
                display: block;
                position: absolute;
                height: 100%;
                width: .125rem;
                background: rgba($dark, .25);
                left: .5rem;
            }
        }
    }
}

.lists {
    .container {
        display: flex;
        flex-wrap: wrap;

        .list {
            flex-basis: 100%;

            @media (min-width: $tablet) {
                flex-basis: 50%;
            }
        }
    }
}
</style>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Nav from './nav';
import ApiCta from './cta/apiCta';
import List from './list';

export default {
    components: {
        Nav,
        ApiCta,
        List,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        lists: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            icons: {
                faAngleRight,
            },
        };
    },
    computed: {
        listsSorted() {
            return [...this.lists].sort((a, b) => {
                if (a.discord_only !== b.discord_only) return a.discord_only ? -1 : 1;
                return a.id.localeCompare(b.id) > 0 ? 1 : -1;
            });
        },
        listsHalf() {
            return Math.ceil(this.lists.length / 4) * 2;
        },
        listsOne() {
            return this.listsSorted.slice(0, this.listsHalf);
        },
        listsTwo() {
            return this.listsSorted.slice(this.listsHalf);
        },
        showCta() {
            return this.lists.length >= 8;
        },
    },
};
</script>
