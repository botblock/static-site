<template>
    <h2>Lists New</h2>
</template>

<script>
const listsData = require('../../util/getLists')();
const getList = require('../../util/getList');

module.exports = {
    data() {
        return {
            lists: listsData
                .filter(list => !list.defunct)
                .sort((a, b) => a.added > b.added ? -1: 1)
                .slice(0, 4)
                .map(list => getList(list.id)),
        };
    },
};
</script>
