<template>
    <div>
        <Hero />
        <div class="container route" v-for="(data, route) in routes" :key="route">
            <Route :route="route" :data="data" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.route {
    &:not(:last-child) {
        > div {
            padding: 0 0 2rem;
            margin: 0 0 2rem;
            border-bottom: 1px solid $brand;
        }
    }
}
</style>

<script>
import spec from '../../data/openapi.yml';
import Hero from '../../components/docs/hero';
import Route from '../../components/docs/route';

// Flatten route & method
const routes = Object.keys(spec.paths).reduce((obj, path) => ({
    ...obj,
    ...Object.keys(spec.paths[path]).reduce((methods, method) => ({
        ...methods,
        [`${method.toUpperCase()} ${path}`]: spec.paths[path][method],
    }), {}),
}), {});

const deref = (object, source) => {
    if (!object) return object;

    if (Array.isArray(object)) {
        return object.map(item => deref(item, source));
    }

    if (object.$ref) {
        try {
            const refParts = object.$ref.split('/').slice(1);
            let ref = source;
            while (refParts.length) ref = ref[refParts.shift()];
            return deref(ref, source);
        } catch (_) {
            // Ignore
        }
    }

    if (typeof object === 'object') {
        return Object.keys(object).reduce((obj, key) => ({
            ...obj,
            [key]: deref(object[key], source),
        }), {});
    }

    return object;
};

export default {
    components: {
        Hero,
        Route,
    },
    data() {
        return {
            routes: deref(routes, spec),
        };
    },
};
</script>
