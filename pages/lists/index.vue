<template>
    <div>
        <div class="hero">
            <Nav dark />
            <div class="container">
                <h1>Bot Lists</h1>
                <p>All active bot lists tracked by BotBlock</p>
            </div>
        </div>
        <div class="lists">
            <div class="container">
                <List :list="list" :key="list.id" v-for="list in listsOne"/>
            </div>
        </div>
        <ApiCta />
        <div class="lists">
            <div class="container">
                <List :list="list" :key="list.id" v-for="list in listsTwo"/>
            </div>
        </div>
        <div class="others">
            <div class="container">
                <p>{{ defunctCount }} lists are marked as defunct and not shown here.</p>
                <NuxtLink to="/lists/defunct">View defunct lists <FA :icon="icons.faAngleRight" /></NuxtLink>
            </div>
            <div class="container">
                <p>{{ hiddenCount }} lists are marked as hidden and not shown here.</p>
                <NuxtLink to="/lists/hidden">View hidden lists <FA :icon="icons.faAngleRight" /></NuxtLink>
            </div>
        </div>
        <div class="submit">
            <div class="container">
                <p>Are we missing a list? Let us know what lists to track on GitHub.</p>
                <NuxtLink to="/submit">Submit a list <FA :icon="icons.faAngleRight" /></NuxtLink>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

.hero {
    background: $brand;
    color: $dark;
    margin: 0 0 2rem;

    .container {
        padding: 2rem 0;

        h1 {
            margin: 0 0 .5rem;
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
                background: rgba($dark, .25);
                left: .5rem;
            }
        }
    }
}

.lists {
    .container {
        display: flex;
        flex-wrap: wrap;

        .list {
            flex-basis: 100%;

            @media (min-width: $tablet) {
                flex-basis: 50%;
            }
        }
    }
}

.others {
    margin: 1rem 0;

    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        p {
            color: rgba($light, .75);
            margin: 0 1rem;
        }

        a {
            padding: .25rem .75rem;
            margin: .25rem;
            display: inline-block;
            border-radius: 1rem;
            background: rgba($light, .1);
            color: rgba($light, .75);
            text-decoration: none;
            font-size: 1rem;
            font-weight: 400;

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

$triangle-height: 5rem;

.submit {
    @include triangleBefore($triangle-height);

    margin: $triangle-height 0 -1rem;
    padding: 0 0 1rem;
    background: $brand;

    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 1rem 0;

        p {
            margin: 0 1rem;
            font-size: 1.5rem;
            color: $dark;
        }

        a {
            padding: .25rem 1rem;
            margin: 1rem;
            display: inline-block;
            border-radius: 1.5rem;
            background: $dark;
            color: $light;
            text-decoration: none;
            font-size: 1.25rem;
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
</style>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import getLists from '../../util/getLists';
import getList from '../../util/getList';
import Nav from '../../components/nav';
import ApiCta from '../../components/apiCta';
import List from '../../components/list';
import Footer from '../../components/footer';
import FA from '../../components/fa';

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
            listsOne: lists.slice(0, Math.ceil(lists.length / 2)),
            listsTwo: lists.slice(Math.ceil(lists.length / 2)),
            defunctCount: getLists().filter(list => list.defunct && list.display).length,
            hiddenCount: getLists().filter(list => !list.display).length,
            icons: {
                faAngleRight,
            },
        };
    },
};
</script>
