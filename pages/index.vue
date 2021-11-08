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
                    <p>With {{ apiCount }} supporting API guild count integration</p>
                </div>
            </div>
        </div>
        <div class="cta">
            <div class="container">
                <div>
                    <p><b>BotBlock API</b></p>
                    <h2>Simplify sending your bot's guild count with the BotBlock API.</h2>
                    <p>
                        Using the BotBlock API allows you to make one POST call to send your bot's guild count to all
                        the bot lists we support.

                        Or, use the BotBlock API to get data about all the lists we track and build your own custom
                        automations directly.
                    </p>
                </div>
                <NuxtLink to="/docs">Read the docs <FA :icon="icons.faAngleRight" /></NuxtLink>
            </div>
        </div>
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
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5rem 0;

        .headline {
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
                font-weight: 600;
                padding: 0 0 0 1.5rem;

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

            h2 {
                font-size: 6rem;
                margin: 0 0 1rem;

                &::before {
                    top: 3rem;
                }

                &::after {
                    bottom: 3rem;
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

.cta {
    background: $brand;
    color: $dark;
    margin: 2rem 0 5rem;
    position: relative;
    z-index: 1;

    &::before,
    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        z-index: -1;
    }

    $triangle-height: 5rem;

    &::before {
        right: 0;
        top: -$triangle-height;
        border-width: 0 0 $triangle-height calc(100vw - 1rem);
        border-color: transparent transparent $brand transparent;
    }

    &::after {
        left: 0;
        bottom: -$triangle-height;
        border-width: $triangle-height calc(100vw - 1rem) 0 0;
        border-color: $brand transparent transparent
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
            margin: 0 2rem 0 0;

            h2 {
                font-size: 3rem;
                font-weight: 600;
                margin: .25rem 0 1rem;
            }

            p {
                font-size: 1.25rem;
                margin: 0;
                color: rgba($dark, .75);

                b {
                    font-size: 1rem;
                    font-weight: 600;
                    letter-spacing: .1px;
                    margin: 0 0 .5rem;
                    padding: .25rem .75rem;
                    border-radius: 1rem;
                    background: rgba($dark, .25);
                    color: $light;
                    display: inline-block;
                }
            }
        }

        a {
            padding: .5rem 1rem;
            margin: 1rem;
            border-radius: .75rem;
            background: $dark;
            color: $light;
            text-decoration: none;
            font-size: 1.5rem;
            white-space: nowrap;

            &:hover,
            &:focus {
                background: rgba($dark, .75);
            }

            > svg {
                margin: 0 0 0 .5rem;
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

            @media (min-width: 550px) {
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
            font-weight: 600;
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
import List from '../components/list';
import Footer from '../components/footer';
import FA from '../components/fa';

const lists = getLists()
    .filter(list => !list.defunct)
    .map(list => getList(list.id));

export default {
    components: {
        Nav,
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
