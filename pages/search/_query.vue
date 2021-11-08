<template>
    <h2>Lists Search</h2>
</template>

<script>
import getLists from '../../util/getLists';
import getList from '../../util/getList';

export default {
    asyncData({ params }) {
        return {
            lists: getLists()
                .filter(list => list.name.toLowerCase().includes(params.query.toLowerCase()))
                .map(list => getList(list.id)),
        };
    },
};
</script>
