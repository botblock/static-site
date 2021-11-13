<template>
    <div class="content">
        <p>{{ type }}</p>
        <div>
            <div class="schema">
                <component :is="level">Schema</component>
                <RouteSchema :data="data.schema" prop="" />
            </div>
            <div v-if="data.examples" class="examples">
                <component :is="level">Examples</component>
                <div class="buttons">
                    <button v-for="(_, exampleName) in data.examples"
                            :key="exampleName"
                            :class="{ active: example === exampleName }"
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
    > p {
        color: $brand;
        margin: 0;
    }

    > div {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -.5rem;

        > div {
            flex-basis: calc(100% - 1rem);
            width: calc(100% - 1rem);
            margin: 0 .5rem;

            @media (min-width: $tablet) {
                flex-basis: calc(50% - 1rem);
                width: calc(50% - 1rem);
            }

            h4,
            h5 {
                font-size: 1.75rem;
                margin: 0 0 .25rem;
            }
        }
    }

    .schema {
        > div {
            margin: 0;
        }
    }

    .examples {
        .buttons {
            border-radius: .5rem .5rem 0 0;
            overflow: hidden;
            background: mix($dark, $brand, 95%);
            border: 1px solid mix($dark, $brand, 80%);
            border-bottom: none;

            button {
                border: 0;
                box-shadow: none;
                background: transparent;
                padding: .5rem .75rem;
                color: $brand;
                cursor: pointer;

                &.active,
                &:hover,
                &:focus {
                    color: $light;
                    background: mix($dark, $brand, 80%);
                }

                &:not(:last-child) {
                    border-right: 1px solid mix($dark, $brand, 80%);
                }
            }
        }

        .example {
            background: mix($dark, $brand, 90%);
            border: 1px solid mix($dark, $brand, 80%);
            color: $light;
            padding: 1rem;
            border-radius: 0 0 .5rem .5rem;
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
import RouteSchema from './route-schema';

export default {
    components: {
        RouteSchema
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
