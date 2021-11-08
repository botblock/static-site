<template>
    <div>
        <div class="container">
            <NuxtLink to="/" class="logo">
                <Logo />
            </NuxtLink>

            <div>
                <NuxtLink to="/lists">Lists</NuxtLink>
                <NuxtLink to="/docs">API Docs</NuxtLink>
            </div>

            <div>
                <a href="/github" target="_blank">GitHub <FA :icon="icons.faExternalLinkAlt" /></a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;

    a {
        margin: 0 1rem;
        padding: .25rem .5rem;
        text-decoration: none;
        color: $light;
        font-weight: 500;

        &:hover,
        &:focus {
            color: $brand;
        }

        > svg {
            margin: 0 0 0 .125rem;
            height: .75rem;
            vertical-align: baseline;
        }

        &.logo {
            margin: 0 4rem 0 0;
            padding: 0;

            > svg {
                margin: 0;
                height: 4rem;
            }
        }
    }

    div {
        display: flex;
        align-items: center;
    }
}
</style>

<script>
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from './logo';
import FA from './fa';

export default {
    components: {
        Logo,
        FA,
    },
    data() {
        return {
            icons: {
                faExternalLinkAlt,
            },
        };
    },
};
</script>
