<template>
    <div>
        <Lists :lists="lists" title="Hidden Lists" subtitle="View information for each list to see why they're hidden" />
        <div class="all">
            <div class="container">
                <p>Looking for the active bot lists?</p>
                <NuxtLink to="/lists">View bot lists <FA :icon="icons.faAngleRight" /></NuxtLink>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

$triangle-height: 5rem;

.all {
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
    .filter(list => !list.display)
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
            icons: {
                faAngleRight,
            },
        };
    },
};
</script>
