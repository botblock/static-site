<template>
    <div class="container">
        <div class="heading">
            <h2>{{ data.summary }}</h2>
            <p>{{ route }}</p>
        </div>

        <div v-html="render(data.description)" v-if="data.description" />

        <h3>
            Request body
            <small v-if="data.requestBody.required">(required)</small>
        </h3>
        <div class="request-body" v-for="(body, type) in data.requestBody.content" :key="type">
            <RouteContent :type="type" :data="body" />
        </div>

        <h3>Responses</h3>
        <div class="response" v-for="(response, status) in data.responses" :key="status">
            <h4>{{ status }}</h4>
            <div v-for="(body, type) in response.content" :key="type">
                <RouteContent :type="type" :data="body" level="h5" />
            </div>

            <h5>Headers</h5>
            <div v-for="(body, header) in response.headers" :key="header">
                <div class="header">
                    <code>{{ header }}</code>
                    <code v-if="body.schema && body.schema.type">
                        {{ body.schema.type }}<span v-if="body.schema.format">&lt;{{ body.schema.format }}&gt;</span>
                    </code>
                </div>
                <div v-html="render(body.description)" v-if="body.description" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1rem;

    h2 {
        margin: 0;
    }

    p {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: .1px;
        margin: 1rem;
        padding: .25rem .75rem;
        border-radius: 1rem;
        background: rgba($brand, .75);
        color: $light;
        display: inline-block;
    }
}

.header {
    display: flex;
    margin: 0 -.25rem;

    > code {
        font-family: monospace;
        font-size: 1rem;
        margin: 0 .25rem;

        &:nth-child(2) {
            color: $brand;
        }
    }
}
</style>

<script>
import MarkdownIt from 'markdown-it';
import RouteContent from './route-content';
import RouteJsdoc from "./route-jsdoc";

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export default {
    components: {
        RouteJsdoc,
        RouteContent,
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        route: {
            type: String,
            required: true
        }
    },
    methods: {
        render(text) {
            return md.render(text);
        },
    },
};
</script>
