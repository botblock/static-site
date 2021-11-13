<template>
    <div>
        <Hero />
        <Route v-for="(data, route) in routes" :key="sluggify(route)" :id="sluggify(route)" :route="route" :data="data" />
    </div>
</template>

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

export default {
    components: {
        Hero,
        Route,
    },
    data() {
        return {
            routes,
        };
    },
    methods: {
        sluggify(string) {
            return `${string}`.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
        }
    },
};
</script>
