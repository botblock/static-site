<template>
    <div>
        <Lists
            :lists="lists"
            :title="feature.name"
            :subtitle="`Feature: ${feature.description}`"
        />
        <Footer>
            <ListsFooter
                text="Looking for other bot list features?"
                button="View all features"
                link="/features"
            />
        </Footer>
    </div>
</template>

<script>
import getFeatures from '../../util/getFeatures';
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
    asyncData({ params, error }) {
        const feature = getFeatures().find(feature => feature.id === params.id);
        if (!feature) return error({ statusCode: 404, message: 'Feature not found' });
        return {
            feature,
            lists: getLists().filter(list => list.features.includes(feature.id)).map(list => getList(list.id)),
        };
    },
    data() {
        return {
            feature: {},
            lists: [],
        };
    },
    head() {
        return generateHead({
            title: data => `${data.feature.name} - Features`,
            description: data => `Lists on BotBlock with: ${data.feature.name} - ${data.feature.description}`,
        }, this);
    },
};
</script>
