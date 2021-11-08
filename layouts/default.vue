<template>
    <div>
        <nuxt />
    </div>
</template>

<style lang="scss">
@import '../scss/globals';

// Set some defaults, loosely based on Skeleton

html,
body {
    background: $dark;
    color: $light;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: 300;
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 300;
}

h1 {
    font-size: 4.0rem;
    line-height: 1.2;
    letter-spacing: -.1rem;

    @media (min-width: 550px) {
        font-size: 5.0rem;
    }
}

h2 {
    font-size: 3.6rem;
    line-height: 1.25;
    letter-spacing: -.1rem;

    @media (min-width: 550px) {
        font-size: 4.2rem;
    }
}

h3 {
    font-size: 3.0rem;
    line-height: 1.3;
    letter-spacing: -.1rem;

    @media (min-width: 550px) {
        font-size: 3.6rem;
    }
}

h4 {
    font-size: 2.4rem;
    line-height: 1.35;
    letter-spacing: -.08rem;

    @media (min-width: 550px) {
        font-size: 3.0rem;
    }
}

h5 {
    font-size: 1.8rem;
    line-height: 1.5;
    letter-spacing: -.05rem;

    @media (min-width: 550px) {
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

.container {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;

    @media (min-width: 400px) {
        width: 85%;
    }

    @media (min-width: 550px) {
        width: 80%;
    }
}


</style>
