<template>
    <div>
        <Lists :lists="lists" title="Hidden Lists" subtitle="View information for each list to see why they're hidden" />
        <ListsFooter text="Looking for the active bot lists?" button="View bot lists" link="/lists" />
        <Footer />
    </div>
</template>

<script>
import getLists from '../../util/getLists';
import getList from '../../util/getList';
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
            lists: getLists().filter(list => !list.display).map(list => getList(list.id)),
        };
    },
};
</script>
