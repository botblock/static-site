<template>
    <h2>Features Index</h2>
</template>

<script>
import getFeatures from '../../util/getFeatures';

export default {
    data() {
        return {
            features: getFeatures(),
        };
    },
};
</script>
