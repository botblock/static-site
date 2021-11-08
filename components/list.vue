<template>
    <div class="list">
        <div>
            <h3>{{ list.id }}</h3>
            <p>{{ list.url }}</p>
            <div class="links">
                <NuxtLink :to="`/lists/${list.id}`" class="highlight">Information</NuxtLink>
                <a :href="list.url">Website</a>
                <a :href="list.discord" v-if="list.discord">Discord</a>
            </div>
        </div>
        <img :src="list.icon" loading="lazy" alt="" />
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';

.list {
    position: relative;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
        top: 2rem;
        height: 1.5rem;
        background: $blue-dark;
    }

    > div {
        margin: 0 1rem 0 0;

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
                border-radius: 1rem;
                background: rgba($light, .1);
                color: $light;
                text-decoration: none;
                font-size: 1rem;
                font-weight: 400;

                &:hover,
                &:focus {
                    background: rgba($light, .25);
                }

                &.highlight {
                    background: $blue-dark;

                    &:hover,
                    &:focus {
                        background: rgba($blue-dark, .75);
                    }
                }
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
export default {
    props: {
        list: {
            type: Object,
            required: true,
        },
    },
};
</script>