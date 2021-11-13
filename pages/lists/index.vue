<template>
    <div>
        <Lists :lists="lists" title="Bot Lists" subtitle="All active bot lists tracked by BotBlock" />
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
import Lists from '../../components/lists';
import Footer from '../../components/footer';
import FA from '../../components/fa';

const lists = getLists()
    .filter(list => !list.defunct && list.display)
    .map(list => getList(list.id));

export default {
    components: {
        Lists,
        Footer,
        FA,
    },
    data() {
        return {
            lists,
            defunctCount: getLists().filter(list => list.defunct && list.display).length,
            hiddenCount: getLists().filter(list => !list.display).length,
            icons: {
                faAngleRight,
            },
        };
    },
};
</script>
