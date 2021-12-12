<template>
    <div>
        <div class="hero">
            <Nav dark />
            <div class="container">
                <h1>Best Practices</h1>
                <p>A curated set of best practices recommended for bot lists</p>
            </div>
        </div>
        <div class="container">
            <div class="practices" v-html="render(practices)" />
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

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

.practices::v-deep {
    margin: 0 0 2rem;

    > :first-child {
        display: none;
    }

    h2 {
        font-weight: $weight-bold;
        font-size: 2.5rem;
        margin: .5rem 0;
        overflow-wrap: anywhere;

        @media (min-width: $tablet) {
            font-size: 3rem;
        }
    }

    a {
        color: $brand;
        text-decoration: none;

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
}
</style>

<script>
import MarkdownIt from 'markdown-it';
import practices from '../../vendor/discord-botlist-best-practices/README.md';
import generateHead from '../../util/generateHead';
import Nav from '../../components/nav';
import Footer from '../../components/footer';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export default {
    head() {
        return generateHead({
            title: 'Best Practices',
            description: 'A curated set of best practices recommended for bot lists',
        }, this);
    },
    components: {
        Nav,
        Footer,
    },
    data() {
        return {
            practices,
        };
    },
    methods: {
        render(text) {
            return md.render(text);
        },
    },
};
</script>
