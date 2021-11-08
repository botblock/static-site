<template>
    <h2>List Id</h2>
</template>

<script>
import getList from '../../util/getList';

export default {
    asyncData({ params, error }) {
        const list = getList(params.id);
        if (list) return { list };
        return error({ statusCode: 404, message: 'List not found' });
    },
};
</script>
