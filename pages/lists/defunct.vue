<template>
    <h2>Lists Defunct</h2>
</template>

<script>
import getLists from '../../util/getLists';
import getList from '../../util/getList';

export default {
    data() {
        return {
            lists: getLists()
                .filter(list => list.defunct)
                .map(list => getList(list.id)),
        };
    },
};
</script>
