<template>
    <div class="cta">
        <div class="container">
            <p>{{ text }}</p>
            <NuxtLink :to="link">
                {{ button }} <FA
                    :icon="icons.faAngleRight"
                    role="img"
                    aria-hidden="true"
                />
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

$triangle-height: 5rem;

.cta {
    @include triangleBefore($triangle-height);

    margin: $triangle-height 0 -1rem;
    padding: 0 0 1rem;
    background: $brand;

    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 1rem 0;

        p {
            margin: 0 1rem;
            font-size: 1.5rem;
            color: $dark;
        }

        a {
            padding: .25rem 1rem;
            margin: 1rem;
            display: inline-block;
            border-radius: 1.5rem;
            background: $dark;
            color: $light;
            text-decoration: none;
            font-size: 1.25rem;
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
    props: {
        text: {
            type: String,
            required: true,
        },
        button: {
            type: String,
            required: true,
        },
        link: {
            type: String,
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
};
</script>
