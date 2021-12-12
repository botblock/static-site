<template>
    <div :class="{ feature: true, small }">
        <div class="info">
            <div class="icon">
                <FA :icon="featureIcon(feature.type)" />
            </div>
            <p v-if="small">
                {{ feature.name }}
            </p>
            <h2 v-else>
                {{ feature.name }}
            </h2>
        </div>
        <p>{{ feature.description }}</p>
        <NuxtLink :to="`/features/${feature.id}`">
            Explore feature <FA :icon="icons.faAngleRight" />
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';
@import '../scss/mixins';

.feature {
    padding: 1rem 2rem;

    &.small {
        padding: .5rem 0;

        .info {
            margin: 0 -.25rem;

            .icon,
            p {
                margin: .25rem;
            }
        }

        p {
            margin: 0 0 .25rem;
        }
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

        p {
            font-size: 1.25rem;
            margin: .5rem;
        }
    }

    p {
        margin: 0 0 .75rem;
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
</style>

<script>
import { faAngleUp, faMinus, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FA from './fa';

export default {
    components: {
        FA,
    },
    props: {
        feature: {
            type: Object,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
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
