<template>
    <h2>Lists Index</h2>
</template>

<script>
const listsData = require('../../util/getLists')();
const getList = require('../../util/getList');

module.exports = {
    data() {
        return {
            lists: listsData
                .filter(list => !list.defunct)
                .map(list => getList(list.id)),
        };
    },
};
</script>
