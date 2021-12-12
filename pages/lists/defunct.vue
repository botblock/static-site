<template>
    <div>
        <Lists
            :lists="lists"
            title="Defunct Lists"
            subtitle="Lists tracked by BotBlock that are no longer functioning"
        />
        <ListsFooter
            text="Looking for the active bot lists?"
            button="View bot lists"
            link="/lists"
        />
        <Footer />
    </div>
</template>

<script>
import getLists from '../../util/getLists';
import getList from '../../util/getList';
import generateHead from '../../util/generateHead';
import Lists from '../../components/lists';
import ListsFooter from '../../components/cta/footerCta';
import Footer from '../../components/footer';

export default {
    components: {
        Lists,
        ListsFooter,
        Footer,
    },
    data() {
        return {
            lists: getLists().filter(list => list.defunct && list.display).map(list => getList(list.id)),
        };
    },
    head() {
        return generateHead({
            title: 'Defunct Lists',
            description: 'Lists tracked by BotBlock that are no longer functioning',
        }, this);
    },
};
</script>
