<template>
    <div class="footer">
        <slot />

        <div class="inner">
            <div class="container">
                <div>
                    <NuxtLink
                        to="/"
                        class="logo"
                    >
                        <Logo
                            role="img"
                            aria-label="Home"
                        />
                    </NuxtLink>
                    <p>
                        &copy; {{ year }} BotBlock
                    </p>
                </div>

                <div>
                    <NuxtLink to="/lists">
                        Lists
                    </NuxtLink>
                    <NuxtLink to="/features">
                        Features
                    </NuxtLink>
                    <NuxtLink to="/docs">
                        API Documentation
                    </NuxtLink>
                    <NuxtLink to="/docs/libraries">
                        API Libraries
                    </NuxtLink>
                    <NuxtLink to="/lists/best-practices">
                        Best Practices
                    </NuxtLink>
                    <NuxtLink to="/about">
                        About
                    </NuxtLink>
                </div>

                <div>
                    <a href="/discord">
                        <FA
                            :icon="icons.faDiscord"
                            role="img"
                            aria-label="Discord"
                        />
                    </a>
                    <a href="/patreon">
                        <FA
                            :icon="icons.faPatreon"
                            role="img"
                            aria-label="Patreon"
                        />
                    </a>
                    <a href="/reddit">
                        <FA
                            :icon="icons.faReddit"
                            role="img"
                            aria-label="Reddit"
                        />
                    </a>
                    <a href="/twitter">
                        <FA
                            :icon="icons.faTwitter"
                            role="img"
                            aria-label="Twitter"
                        />
                    </a>
                    <a href="/github">
                        <FA
                            :icon="icons.faGithub"
                            role="img"
                            aria-label="GitHub"
                        />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.footer {
    margin: auto 0 0;

    .inner {
        background: $brand;
        margin: 1rem 0 0;

        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: .5rem 0 0;

            a {
                margin: .5rem .25rem;
                padding: .25rem .5rem;
                text-decoration: none;
                text-transform: uppercase;
                font-weight: $weight-bold;
                font-size: .9rem;
                letter-spacing: .1px;
                color: $dark;

                &:hover,
                &:focus {
                    color: rgba($dark, .75);
                }

                > svg {
                    height: 1.25rem;
                }

                &.logo {
                    > svg {
                        height: 2rem;
                    }
                }
            }

            p {
                color: $dark;
                margin: 0;
            }

            div {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
        }
    }
}
</style>

<script>
import { faDiscord, faPatreon, faReddit, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import Logo from '../assets/Icon Slim.svg';
import FA from './fa';

export default {
    components: {
        Logo,
        FA,
    },
    data() {
        return {
            year: new Date().getFullYear(),
            icons: {
                faDiscord,
                faPatreon,
                faReddit,
                faTwitter,
                faGithub,
            },
        };
    },
    mounted() {
        this.year = new Date().getFullYear();
    },
};
</script>
