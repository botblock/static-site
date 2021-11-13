<template>
    <div class="content">
        <p>{{ type }}</p>
        <div>
            <div>
                <component :is="level">Schema</component>
                <RouteJsdoc :data="data.schema" prop="" />
            </div>
            <div v-if="data.examples" class="examples">
                <component :is="level">Examples</component>
                <div>
                    <button v-for="(_, exampleName) in data.examples"
                            :key="exampleName"
                            @click.prevent="setExample(exampleName)">
                        {{ exampleName }}
                    </button>
                </div>
                <div v-for="(exampleData, exampleName) in data.examples"
                     :key="exampleName"
                     v-if="example === exampleName" class="example">
                    <code>{{ JSON.stringify(exampleData.value, null, 2) }}</code>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.content {
    > div {
        display: flex;
        margin: 0 -.5rem;

        > div {
            flex-basis: 50%;
            margin: 0 .5rem;
        }
    }

    .examples {
        .example {
            background: mix($dark, $brand, 90%);
            border: 1px solid mix($dark, $brand, 80%);
            color: $light;
            padding: 1rem;
            border-radius: .5rem;
            max-width: 100%;
            overflow-x: auto;

            code {
                white-space: pre;
            }
        }
    }
}
</style>

<script>
import RouteJsdoc from "./route-jsdoc";
export default {
    components: {
        RouteJsdoc
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            default: 'h4',
        },
    },
    data() {
        return {
            example: this.data.examples && Object.keys(this.data.examples)[0],
        };
    },
    methods: {
        setExample(example) {
            this.example = example;
        },
    },
};
</script>
