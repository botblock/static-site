<template>
    <div>
        <Nav />
        <div class="error">
            <div class="container">
                <FA
                    :icon="icons.faExclamationCircle"
                    role="img"
                    aria-hidden="true"
                />

                <h1 v-if="notFound">
                    Page not found
                </h1>
                <h1 v-else>
                    An error occurred
                </h1>

                <NuxtLink to="/">
                    <FA
                        :icon="icons.faAngleLeft"
                        role="img"
                        aria-hidden="true"
                    />
                    Home
                </NuxtLink>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';
@import '../scss/mixins';

.error {
    margin: auto 0;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 0;

        > svg {
            font-size: 6rem;
            margin: 0 0 1.5rem;
            color: rgba($brand, .5);
        }

        h1 {
            font-weight: $weight-bold;
        }

        a {
            padding: .25rem 1.5rem;
            margin: 1rem;
            display: inline-block;
            border-radius: 1.5rem;
            background: $brand;
            color: $light;
            text-decoration: none;
            font-size: 1.5rem;
            white-space: nowrap;

            &:hover,
            &:focus {
                background: rgba($brand, .75);
            }

            > svg {
                margin: 0 .5rem 0 0;
            }
        }
    }
}

</style>

<script>
import { faExclamationCircle, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import generateHead from '../util/generateHead';
import Nav from '../components/nav';
import Footer from '../components/footer';
import FA from '../components/fa';

export default {
    components: {
        Nav,
        Footer,
        FA,
    },
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            icons: {
                faExclamationCircle,
                faAngleLeft,
            },
        };
    },
    head() {
        return generateHead({
            title: data => data.notFound ? 'Not Found' : 'Error Occurred',
            description: data => data.notFound ? 'Page requested was mot found' : 'An error occurred when loading the page',
        }, this);
    },
    computed: {
        notFound() {
            return this.error.statusCode === 404;
        },
    },
};
</script>
