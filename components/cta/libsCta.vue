<template>
    <div class="cta">
        <div class="container">
            <div>
                <p><b>API Libraries</b></p>
                <h2>Interact with the BotBlock API through libraries built for Discord bots.</h2>
                <p>
                    Save time and get started with the BotBlock API faster by using one of our pre-built libraries,
                    designed with Discord bots in mind.
                </p>
            </div>
            <NuxtLink to="/docs/libs">Explore libraries <FA :icon="icons.faAngleRight" /></NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

$triangle-height: 5rem;

.cta {
    @include triangleBefore($triangle-height);
    @include triangleAfter($triangle-height);

    background: $brand;
    color: $dark;
    margin: $triangle-height 0;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        @media (min-width: $tablet) {
            flex-wrap: nowrap;
        }

        div {
            margin: 0 2rem 0 0;

            h2 {
                font-size: 3rem;
                font-weight: $weight-bold;
                margin: .25rem 0 1rem;
            }

            p {
                font-size: 1.25rem;
                margin: 0;
                color: rgba($dark, .75);

                b {
                    font-size: 1rem;
                    font-weight: $weight-bold;
                    letter-spacing: .1px;
                    margin: 0 0 .5rem;
                    padding: .25rem .75rem;
                    border-radius: 1rem;
                    background: rgba($dark, .25);
                    color: $light;
                    display: inline-block;
                }
            }
        }

        a {
            padding: .5rem 1.25rem;
            margin: 1rem;
            display: inline-block;
            border-radius: 1.75rem;
            background: $dark;
            color: $light;
            text-decoration: none;
            font-size: 1.5rem;
            white-space: nowrap;

            &:hover,
            &:focus {
                background: rgba($dark, .75);
            }

            > svg {
                margin: 0 0 0 .5rem;
            }
        }
    }
}
</style>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FA from '../fa';

export default {
    components: {
        FA,
    },
    data() {
        return {
            icons: {
                faAngleRight,
            },
        };
    },
};
</script>
