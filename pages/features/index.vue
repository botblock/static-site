<template>
    <div>
        <div class="hero">
            <Nav dark />
            <div class="container">
                <h1>Features</h1>
                <p>All bot list features tracked by BotBlock</p>
            </div>
        </div>
        <div class="features">
            <div class="container">
                <Feature class="feature" :feature="feature" v-for="feature in features" :key="feature.id" />
            </div>
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

.features {
    .container {
        display: flex;
        flex-wrap: wrap;

        .feature {
            flex-basis: 100%;

            @media (min-width: $tablet) {
                flex-basis: 50%;
            }
        }
    }
}
</style>

<script>
import getFeatures from '../../util/getFeatures';
import generateHead from '../../util/generateHead';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import Feature from '../../components/feature';

export default {
    head() {
        return generateHead({
            title: 'Features',
            description: 'All bot list features tracked by BotBlock',
        }, this);
    },
    components: {
        Nav,
        Footer,
        Feature,
    },
    data() {
        return {
            features: getFeatures().sort((a, b) => {
                if (a.display === b.display) return a.id.localeCompare(b.id) > 0 ? 1 : -1;
                return a.display < b.display ? 1 : -1;
            }),
        };
    },
};
</script>
