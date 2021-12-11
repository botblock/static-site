<template>
    <div class="footer">
        <div class="container">
            <div>
                <NuxtLink to="/" class="logo">
                    <Logo />
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
            </div>

            <div>
                <a href="/discord">
                    <FA :icon="icons.faDiscord" />
                </a>
                <a href="/patreon">
                    <FA :icon="icons.faPatreon" />
                </a>
                <a href="/reddit">
                    <FA :icon="icons.faReddit" />
                </a>
                <a href="/twitter">
                    <FA :icon="icons.faTwitter" />
                </a>
                <a href="/github">
                    <FA :icon="icons.faGithub" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.footer {
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
</style>

<script>
import { faDiscord, faPatreon, faReddit, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import Logo from './logo';
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
