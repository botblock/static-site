<template>
    <nuxt class="content" />
</template>

<style lang="scss">
@import '../scss/globals';

// Set some defaults, loosely based on Skeleton

html,
body {
    background: $dark;
    color: $light;
    font-family: $font-sans-serif;
    font-weight: $weight-default;
    line-height: 1.6;
    font-size: 1em;
}

code {
    font-family: $font-mono;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: $weight-default;
}

h1 {
    font-size: 4.0rem;
    line-height: 1.2;
    letter-spacing: -.1rem;

    @media (min-width: $tablet) {
        font-size: 5.0rem;
    }
}

h2 {
    font-size: 3.6rem;
    line-height: 1.25;
    letter-spacing: -.1rem;

    @media (min-width: $tablet) {
        font-size: 4.2rem;
    }
}

h3 {
    font-size: 3.0rem;
    line-height: 1.3;
    letter-spacing: -.1rem;

    @media (min-width: $tablet) {
        font-size: 3.6rem;
    }
}

h4 {
    font-size: 2.4rem;
    line-height: 1.35;
    letter-spacing: -.08rem;

    @media (min-width: $tablet) {
        font-size: 3.0rem;
    }
}

h5 {
    font-size: 1.8rem;
    line-height: 1.5;
    letter-spacing: -.05rem;

    @media (min-width: $tablet) {
        font-size: 2.4rem;
    }
}

h6 {
    font-size: 1.5rem;
    line-height: 1.6;
    letter-spacing: 0;
}

p {
    margin-top: 0;
}

a {
    color: $brand;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

b {
    font-weight: $weight-bold;
}

code {
    background: mix($dark, $brand, 90%);
    border: 1px solid mix($dark, $brand, 80%);
    padding: .125rem .25rem;
    border-radius: .5rem;
}

.container {
    max-width: 1280px;
    width: calc(100% - 2rem);
    margin: 0 auto;

    @media (min-width: $mobile) {
        width: 85%;
    }

    @media (min-width: $tablet) {
        width: 80%;
    }
}
</style>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
