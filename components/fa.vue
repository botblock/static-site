<template>
    <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
        <path fill="currentColor" :d="path" :key="path" v-for="path in paths" />
    </svg>
</template>

<style scoped lang="scss">
svg {
    height: 1.125em;
    vertical-align: text-bottom;
}
</style>

<script>
export default {
    props: {
        icon: {
            type: Object,
            required: true,
        },
    },
    computed: {
        viewBox() {
            return `0 0 ${this.icon.icon[0]} ${this.icon.icon[1]}`;
        },
        paths() {
            return Array.isArray(this.icon.icon[4]) ? this.icon.icon[4] : [ this.icon.icon[4] ];
        },
    },
};
</script>
