<template>
    <div>
        <div class="container">
            <NuxtLink to="/" class="logo">
                <Logo />
            </NuxtLink>

            <div>
                <NuxtLink to="/">Lists</NuxtLink>
                <NuxtLink to="/docs">API Docs</NuxtLink>
            </div>

            <div>
                <a href="https://github.com/botblock">GitHub</a>
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

    .logo {
        margin: 0 4rem 0 0;
        padding: 0;

        > svg {
            width: 4rem;
        }
    }

    a {
        margin: 0 1rem;
        padding: .25rem .5rem;
        text-decoration: none;
        color: $light;
        font-weight: 500;

        &:hover,
        &:focus {
            color: $blue-dark;
        }
    }

    div {
        display: flex;
        align-items: center;
    }
}
</style>

<script>
import Logo from './logo';

export default {
    components: {
        Logo,
    },
};
</script>
