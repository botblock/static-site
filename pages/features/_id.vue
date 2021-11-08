<template>
    <h2>Feature Id</h2>
</template>

<script>
import getFeatures from '../../util/getFeatures';
import getLists from '../../util/getLists';
import getList from '../../util/getList';

export default {
    asyncData({ params, error }) {
        const feature = getFeatures().find(feature => feature.id === params.id);
        if (!feature) return error({ statusCode: 404, message: 'Feature not found' });
        return {
            feature,
            lists: getLists()
                .filter(list => list.features.includes(feature.id))
                .map(list => getList(list.id)),
        };
    },
};
</script>
