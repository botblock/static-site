<template>
    <h2>Feature Id</h2>
</template>

<script>
const featuresData = require('../../../util/getFeatures')();
const listsData = require('../../../util/getLists')();
const getList = require('../../../util/getList');

module.exports = {
    asyncData({ params, error }) {
        const feature = featuresData.find(feature => feature.id === params.id);
        if (!feature) return error({ statusCode: 404, message: 'Feature not found' });
        return {
            feature,
            lists: listsData
                .filter(list => list.features.includes(feature.id))
                .map(list => getList(list.id)),
        };
    },
};
</script>
