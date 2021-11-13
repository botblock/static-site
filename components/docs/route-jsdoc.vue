<template>
    <div class="jsdoc">
        <div class="prop">
            <code>
                {{ prop }}
            </code>
            <code v-if="data.type">
                {{ data.type }}<span v-if="data.format">&lt;{{ data.format }}&gt;</span>
            </code>
        </div>

        <div class="desc" v-if="data.description" v-html="render(data.description)" />

        <div class="info">
            <p v-if="'minItems' in data">Min items: {{ data.minItems }}</p>
            <p v-if="'maxItems' in data">Max items: {{ data.maxItems }}</p>
        </div>

        <template v-if="data.type === 'object'">
            <RouteJsdoc :data="item" :prop="key" v-for="(item, key) in data.properties" :key="key" v-if="data.properties" />
            <RouteJsdoc :data="data.additionalProperties" prop="<*>" v-if="data.additionalProperties" />
        </template>

        <template v-if="data.type === 'array'">
            <RouteJsdoc :data="data.items" prop="[*]" v-if="data.items" />
        </template>

        <template v-if="data.oneOf">
            <div class="info">
                <p>One of:</p>
            </div>
            <RouteJsdoc :data="item" prop="-" v-for="(item, idx) in data.oneOf" :key="idx" />
        </template>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.jsdoc {
    margin: .25rem 0 .25rem 1rem;

    .prop {
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

    .desc::v-deep {
        color: rgba($light, .85);

        p {
            margin: 0 0 .5rem;
            line-height: 1.25;
        }
    }

    .info {
        font-size: .9rem;
        color: rgba($light, .75);

        p {
            margin: 0;
            line-height: 1.25;
        }
    }
}
</style>

<script>
import MarkdownIt from 'markdown-it';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export default {
    name: 'RouteJsdoc',
    props: {
        prop: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
    },
    methods: {
        render(text) {
            return md.render(text);
        },
    },
};
</script>
