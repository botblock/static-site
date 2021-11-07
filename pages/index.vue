<template>
    <h2>Index</h2>
</template>

<script>
const listsData = require('../util/getLists')();
const getList = require('../util/getList');

module.exports = {
    data() {
        return {
            lists: listsData.map(list => list.id).sort(() => Math.random() - Math.random()).slice(0, 2).map(getList),
        };
    },
};
</script>
