<template>
    <div>
        <Lists
            :lists="lists"
            title="Bot Lists"
            subtitle="All active bot lists tracked by BotBlock"
        />
        <div class="others">
            <div class="container">
                <p>{{ defunctCount }} lists are marked as defunct and not shown here.</p>
                <NuxtLink to="/lists/defunct">
                    View defunct lists <FA :icon="icons.faAngleRight" />
                </NuxtLink>
            </div>
            <div class="container">
                <p>{{ hiddenCount }} lists are marked as hidden and not shown here.</p>
                <NuxtLink to="/lists/hidden">
                    View hidden lists <FA :icon="icons.faAngleRight" />
                </NuxtLink>
            </div>
        </div>
        <ListsFooter
            text="Are we missing a list? Let us know what lists to track on GitHub."
            button="Submit a list"
            link="/submit"
        />
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
</style>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import getLists from '../../util/getLists';
import getList from '../../util/getList';
import generateHead from '../../util/generateHead';
import Lists from '../../components/lists';
import ListsFooter from '../../components/cta/footerCta';
import Footer from '../../components/footer';
import FA from '../../components/fa';

export default {
    components: {
        Lists,
        ListsFooter,
        Footer,
        FA,
    },
    data() {
        return {
            lists: getLists().filter(list => !list.defunct && list.display).map(list => getList(list.id)),
            defunctCount: getLists().filter(list => list.defunct && list.display).length,
            hiddenCount: getLists().filter(list => !list.display).length,
            icons: {
                faAngleRight,
            },
        };
    },
    head() {
        return generateHead({
            title: 'Bot Lists',
            description: 'All active bot lists tracked by BotBlock',
        }, this);
    },
};
</script>
