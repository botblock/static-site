<template>
    <div class="list">
        <div>
            <img
                :src="list.icon"
                loading="lazy"
                alt="List icon"
                @error="iconError"
            >
            <div>
                <h3>{{ list.id }}</h3>
                <p>{{ list.url }}</p>
                <div class="links">
                    <NuxtLink
                        v-if="!hideInformationLink"
                        :to="`/lists/${list.id}`"
                        class="highlight"
                    >
                        Information
                    </NuxtLink>
                    <a
                        :href="list.url"
                        rel="noopener"
                        :class="{ highlight: hideInformationLink }"
                    >Website</a>
                    <a
                        v-if="list.discord"
                        :href="list.discord"
                        rel="noopener"
                    >Discord</a>
                </div>
            </div>
        </div>
        <div :class="{ feature: true, active: hasFeature }">
            <div>
                <FA
                    :icon="hasFeature ? icons.faCheck : icons.faMinus"
                    role="img"
                    :aria-label="hasFeature ? 'Positive' : 'Negative'"
                />
            </div>
            <p>{{ featureText }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.list {
    position: relative;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;

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
        display: flex;
        flex-wrap: wrap;
        margin: 0 1rem 0 0;

        img {
            width: 5rem;
            height: 5rem;
            object-fit: cover;
            border-radius: 50%;
            background: rgba($light, .05);
            border: 1px solid rgba($brand, .2);
            margin: 0 1rem 1rem 0;
        }

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
    }

    .feature {
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
</style>

<script>
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import Logo from '!url-loader!../assets/Icon Slim.svg';
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
            Logo,
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
    methods: {
        iconError(e) {
            e.target.src = Logo;
            e.target.style.opacity = '0.25';
        },
    },
};
</script>
