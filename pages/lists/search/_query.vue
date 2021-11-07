<template>
    <h2>Lists Search</h2>
</template>

<script>
const listsData = require('../../../util/getLists')();
const getList = require('../../../util/getList');

module.exports = {
    asyncData({ params }) {
        return {
            lists: listsData
                .filter(list => list.name.toLowerCase().includes(params.query.toLowerCase()))
                .map(list => getList(list.id)),
        };
    },
};
</script>
