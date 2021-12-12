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
                <div class="feature" v-for="feature in features" :key="feature.id">
                    <div class="info">
                        <div class="icon">
                            <FA :icon="featureIcon(feature.type)" />
                        </div>
                        <h2>{{ feature.name }}</h2>
                    </div>
                    <p>{{ feature.description }}</p>
                    <NuxtLink :to="`/features/${feature.id}`">
                        Explore lists <FA :icon="icons.faAngleRight" />
                    </NuxtLink>
                </div>
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
            padding: 1rem 2rem;

            @media (min-width: $tablet) {
                flex-basis: 50%;
            }

            .info {
                display: flex;
                align-items: center;
                margin: 0 -.5rem;

                .icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba($light, .1);
                    width: 1.75rem;
                    height: 1.75rem;
                    padding: .25rem;
                    margin: .5rem;
                    border-radius: .25rem;

                    svg {
                        height: auto;
                        width: 100%;
                        color: $brand;
                    }
                }

                h2 {
                    font-size: 2.5rem;
                    margin: .5rem;
                }
            }

            a {
                padding: .25rem 1rem;
                margin: 0;
                display: inline-block;
                border-radius: 1.5rem;
                background: $brand;
                color: $light;
                text-decoration: none;
                font-size: 1rem;
                white-space: nowrap;

                &:hover,
                &:focus {
                    background: rgba($brand, .75);
                }

                > svg {
                    margin: 0 0 0 .25rem;
                }
            }
        }
    }
}
</style>

<script>
import { faAngleUp, faMinus, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import getFeatures from '../../util/getFeatures';
import generateHead from '../../util/generateHead';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import FA from '../../components/fa';

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
        FA,
    },
    data() {
        return {
            features: getFeatures().sort((a, b) => {
                if (a.display === b.display) return a.id.localeCompare(b.id) > 0 ? 1 : -1;
                return a.display < b.display ? 1 : -1;
            }),
            icons: {
                faAngleUp,
                faMinus,
                faAngleDown,
                faAngleRight,
            },
        };
    },
    methods: {
        featureIcon(type) {
            if (type === 0) return this.icons.faAngleUp;
            if (type === 1) return this.icons.faMinus;
            if (type === 2) return this.icons.faAngleDown;
        },
    },
};
</script>
