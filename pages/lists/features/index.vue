<template>
    <h2>Features Index</h2>
</template>

<script>
const featuresData = require('../../../util/getFeatures')();

module.exports = {
    data() {
        return {
            features: featuresData,
        };
    },
};
</script>
