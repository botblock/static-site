<template>
    <h2>Lists New</h2>
</template>

<script>
import getLists from '../../util/getLists';
import getList from '../../util/getList';

export default {
    data() {
        return {
            lists: getLists()
                .filter(list => !list.defunct)
                .sort((a, b) => a.added > b.added ? -1: 1)
                .slice(0, 4)
                .map(list => getList(list.id)),
        };
    },
};
</script>
