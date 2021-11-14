<template>
    <div>
        <div class="hero">
            <Nav />
            <div class="container">
                <div class="headline">
                    <h1>BotBlock<small>.org</small></h1>
                    <p>The single source for all Discord bot lists.</p>
                </div>
                <div class="glow">
                    <h2>{{ listCount }} Bot Lists</h2>
                    <p>({{ apiCount }} lists supporting API guild count integration)</p>
                </div>
            </div>
        </div>
        <ApiCta />
        <div class="lists">
            <div class="container">
                <h2>Recent Lists</h2>
                <List :list="list" :key="list.id" v-for="list in lists"/>
                <NuxtLink to="/lists">Explore more lists <FA :icon="icons.faAngleRight" /></NuxtLink>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
@import '~fontsource-megrim';
@import '../scss/globals';

.hero {
    margin: 0 0 -4rem;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0 1rem;

        @media (min-width: $tablet) {
            padding: 4rem 0 1rem;
        }

        .headline {
            margin: 1rem 0 4rem;

            h1 {
                margin: 0 0 .5rem;

                small {
                    margin: 0 0 0 .125ch;
                    font-size: .5em;
                    color: rgba($light, .5);
                }
            }

            p {
                position: relative;
                font-size: 1.25rem;
                line-height: 1.25;
                font-weight: $weight-bold;
                padding: 0 0 0 1.5rem;
                margin: 0;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 100%;
                    width: .125rem;
                    background: $brand;
                    left: .5rem;
                }
            }
        }

        .glow {
            margin: 1rem 0 4rem;
            text-align: center;

            h2,
            p {
                position: relative;
                z-index: 1;
                font-family: 'Megrim', sans-serif;
                font-weight: 100;
                line-height: 1.25;
                color: lighten($brand, 50%);
                text-shadow: 0 0 .5rem saturate($brand, 25%),
                    0 0 1rem saturate($brand, 25%),
                    0 0 2rem saturate($brand, 25%),
                    0 0 4rem $brand,
                    0 0 8rem $brand,
                    0 0 16rem $brand,
                    0 0 32rem $brand;

                @media (min-width: $tablet) {
                    &::before,
                    &::after {
                        content: '';
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: .25rem;
                        background: lighten(desaturate($dark, 100%), 7.5%);
                        z-index: -1;
                    }
                }
            }

            h2 {
                font-size: 4rem;
                margin: 0 0 1rem;

                @media (min-width: $tablet) {
                    font-size: 6rem;
                }

                &::before {
                    top: 3rem;
                }

                &::after {
                    bottom: 2.5rem;
                }
            }

            p {
                font-size: 1.5rem;
                margin: 0 0 1rem;

                &::before {
                    display: none;
                }

                &::after {
                    bottom: .75rem;
                }
            }
        }
    }
}

.lists {
    .container {
        display: flex;
        flex-wrap: wrap;

        h2 {
            flex-basis: 100%;
            font-size: 2.5rem;
            margin: 1rem 0 .5rem;
        }

        .list {
            flex-basis: 100%;

            @media (min-width: $tablet) {
                flex-basis: 50%;
            }
        }

        a {
            justify-self: center;
            padding: .125rem 1rem;
            margin: 2rem auto;
            border-radius: 1rem;
            background: $brand;
            color: $light;
            text-decoration: none;
            font-size: 1.25rem;
            font-weight: $weight-bold;
            white-space: nowrap;

            &:hover,
            &:focus {
                background: rgba($brand, .75);
            }

            > svg {
                margin: 0 0 0 .5rem;
            }
        }
    }
}
</style>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import getLists from '../util/getLists';
import getList from '../util/getList';
import Nav from '../components/nav';
import ApiCta from '../components/cta/apiCta';
import List from '../components/list';
import Footer from '../components/footer';
import FA from '../components/fa';

const lists = getLists()
    .filter(list => !list.defunct && list.display)
    .map(list => getList(list.id));

export default {
    components: {
        Nav,
        ApiCta,
        List,
        Footer,
        FA,
    },
    data() {
        return {
            lists: lists.sort((a, b) => a.added > b.added ? -1: 1).slice(0, 6),
            listCount: lists.length,
            apiCount: lists.filter(list => !!list.api_post).length,
            icons: {
                faAngleRight,
            },
        };
    },
};
</script>
