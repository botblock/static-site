<template>
    <div class="schema">
        <div class="prop">
            <code v-if="prop">
                {{ prop }}
            </code>
            <code
                v-if="data.type || (!data.oneOf && !data.allOf)"
                class="type"
            >
                {{ data.type || 'Any' }}<span v-if="data.format">&lt;{{ data.format }}&gt;</span>
            </code>
        </div>

        <div class="info">
            <p v-if="data.nullable">
                Nullable: true
            </p>
            <p v-if="data.enum">
                [ {{ data.enum.join(', ') }} ]
            </p>
            <p v-if="'minItems' in data">
                Min items: {{ data.minItems }}
            </p>
            <p v-if="'maxItems' in data">
                Max items: {{ data.maxItems }}
            </p>
        </div>

        <div
            v-if="data.description"
            class="desc"
            v-html="render(data.description)"
        />

        <template v-if="data.type === 'object'">
            <template v-if="data.properties">
                <RouteSchema
                    v-for="(item, key) in data.properties"
                    :key="key"
                    :data="item"
                    :prop="key"
                />
            </template>

            <RouteSchema
                v-if="data.additionalProperties"
                :data="data.additionalProperties"
                prop="<*>"
            />
        </template>

        <template v-if="data.type === 'array'">
            <RouteSchema
                v-if="data.items"
                :data="data.items"
                prop="[*]"
            />
        </template>

        <template v-if="data.oneOf">
            <div class="info">
                <p>One of:</p>
            </div>
            <RouteSchema
                v-for="(item, idx) in data.oneOf"
                :key="idx"
                :data="item"
                prop="-"
            />
        </template>

        <template v-if="data.allOf">
            <div class="info">
                <p>All of:</p>
            </div>
            <RouteSchema
                v-for="(item, idx) in data.allOf"
                :key="idx"
                :data="item"
                prop="-"
            />
        </template>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.schema {
    margin: .25rem 0 .25rem 1rem;

    .prop {
        display: flex;
        margin: 0 -.25rem;

        > code {
            font-size: 1rem;
            margin: 0 .25rem;

            &.type {
                color: $brand;
            }
        }
    }

    .info {
        font-size: .9rem;
        color: rgba($light, .75);

        p {
            margin: 0;
            line-height: 1.25;

            &:last-child {
                margin: 0 0 .5rem;
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
}
</style>

<script>
import MarkdownIt from 'markdown-it';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

export default {
    name: 'RouteSchema',
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
