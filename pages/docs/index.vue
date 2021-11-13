<template>
    <div>
        <Hero />
        <div class="container">
            <Route :route="routes[0][0]" :data="routes[0][1]" class="route" />
        </div>
        <LibsCta />
        <div class="container">
            <Route :route="route" :data="data" class="route" v-for="([ route, data ]) in routes.slice(1)" :key="route" />
        </div>
        <Footer class="footer" />
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.route {
    padding: 1rem 0;

    &:not(:last-child) {
        margin: 0 0 1rem;
        border-bottom: 1px solid $brand;
    }
}

.footer {
    margin: 2rem 0 0;
}
</style>

<script>
import spec from '../../data/openapi.yml';
import Hero from '../../components/docs/hero';
import Route from '../../components/docs/route';
import Footer from '../../components/footer';
import LibsCta from '../../components/libsCta';

// Flatten route & method
const routes = Object.keys(spec.paths).reduce((obj, path) => ({
    ...obj,
    ...Object.keys(spec.paths[path]).reduce((methods, method) => ({
        ...methods,
        [`${method.toUpperCase()} ${path}`]: spec.paths[path][method],
    }), {}),
}), {});

// Recursively replace any use of $ref with the source data
// Does not follow the OpenAPI spec for where $ref can be used
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
        LibsCta,
        Hero,
        Route,
        Footer,
    },
    data() {
        return {
            routes: Object.entries(deref(routes, spec)),
        };
    },
};
</script>
