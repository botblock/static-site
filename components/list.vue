<template>
    <div class="list">
        <div>
            <h3>{{ list.id }}</h3>
            <p>{{ list.url }}</p>
            <div class="links">
                <NuxtLink :to="`/lists/${list.id}`" class="highlight" v-if="!hideInformationLink">Information</NuxtLink>
                <a :href="list.url" rel="noopener" :class="{ highlight: hideInformationLink }">Website</a>
                <a :href="list.discord" rel="noopener" v-if="list.discord">Discord</a>
            </div>
            <div :class="{ feature: true, active: hasFeature }">
                <div><FA :icon="hasFeature ? icons.faCheck : icons.faMinus" /></div>
                <p>{{ featureText }}</p>
            </div>
        </div>
        <img :src="list.icon" loading="lazy" alt="" />
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.list {
    position: relative;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    &::before,
    &::after {
        content: '';
        display: block;
        width: 1px;
        position: absolute;
        left: 1rem;
    }

    &::before {
        top: 0;
        height: 100%;
        background: rgba($light, .05);
    }

    &::after {
        top: 1.25rem;
        height: 1.75rem;
        background: $brand;
    }

    > div {
        margin: 0 1rem .5rem 0;

        h3 {
            font-size: 1.5rem;
            line-height: 1;
            margin: .25rem 0;
        }

        p {
            color: rgba($light, .5);
            margin: 0 0 .5rem;
        }

        .links {
            margin: 0 -.25rem;

            a {
                padding: .25rem .75rem;
                margin: .25rem;
                display: inline-block;
                border-radius: 1rem;
                background: rgba($light, .1);
                color: $light;
                text-decoration: none;
                font-size: 1rem;

                &:hover,
                &:focus {
                    background: rgba($light, .25);
                }

                &.highlight {
                    background: $brand;

                    &:hover,
                    &:focus {
                        background: rgba($brand, .75);
                    }
                }
            }
        }

        .feature {
            display: flex;
            align-items: center;

            &.active {
                > div {
                    svg {
                        color: $brand;
                    }
                }

                p {
                    color: rgba($light, .8);
                }
            }

            > div {
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
                    color: rgba($light, .5);
                }
            }

            p {
                color: rgba($light, .4);
                margin: 0 .25rem;
            }
        }
    }

    img {
        width: 5rem;
        height: 5rem;
        object-fit: cover;
        border-radius: 50%;
        background: rgba($light, .05);
    }
}
</style>

<script>
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import FA from './fa';

export default {
    components: {
        FA,
    },
    props: {
        list: {
            type: Object,
            required: true,
        },
        hideInformationLink: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            icons: {
                faCheck,
                faMinus,
            },
        };
    },
    computed: {
        hasFeature() {
            return !!this.list.api_post;
        },
        featureText() {
            return this.hasFeature ? 'Works with BotBlock guild count API' : 'No support for BotBlock guild count API';
        },
    },
};
</script>
