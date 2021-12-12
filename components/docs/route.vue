<template>
    <div class="route" :id="sluggify(route)">
        <div class="heading">
            <h2>{{ data.summary }}</h2>
            <div>
                <p>{{ route }}</p>
                <a :href="`#${sluggify(route)}`">
                    <FA :icon="icons.faLink" />
                </a>
                <a @click.prevent="toggleVisible">
                    <FA :icon="visible ? icons.faEye : icons.faEyeSlash" />
                </a>
            </div>
        </div>

        <template v-if="visible">
            <div class="description" v-html="render(data.description)" v-if="data.description" />

            <div class="parameters" v-if="data.parameters">
                <div v-if="parametersPath.length">
                    <h3>Path Parameters</h3>
                    <div v-for="body in parametersPath" :key="body.name">
                        <div class="prop">
                            <code>{{ body.name }}</code>
                            <code v-if="body.schema && body.schema.type">
                                {{ body.schema.type }}<span v-if="body.schema.format">&lt;{{ body.schema.format }}&gt;</span>
                            </code>
                        </div>
                        <div v-html="render(body.description)" v-if="body.description" />
                    </div>
                </div>

                <div v-if="parametersQuery.length">
                    <h3>Query Parameters</h3>
                    <div v-for="body in parametersQuery" :key="body.name">
                        <div class="prop">
                            <code>{{ body.name }}</code>
                            <code v-if="body.schema && body.schema.type">
                                {{ body.schema.type }}<span v-if="body.schema.format">&lt;{{ body.schema.format }}&gt;</span>
                            </code>
                        </div>
                        <div v-html="render(body.description)" v-if="body.description" />
                    </div>
                </div>
            </div>

            <template v-if="data.requestBody">
                <h3>
                    Request body
                    <small v-if="data.requestBody.required">(required)</small>
                </h3>
                <div class="request-body" v-for="(body, type) in data.requestBody.content" :key="type">
                    <RouteContent :type="type" :data="body" />
                </div>
            </template>

            <h3>Responses</h3>
            <div class="response" v-for="(response, status) in data.responses" :key="status">
                <div class="heading">
                    <h4>{{ status }}</h4>
                    <div class="description" v-html="render(response.description)" v-if="response.description" />
                </div>
                <div v-for="(body, type) in response.content" :key="type">
                    <RouteContent :type="type" :data="body" level="h5" />
                </div>

                <template v-if="response.headers">
                    <h5>Headers</h5>
                    <div v-for="(body, header) in response.headers" :key="header">
                        <div class="prop">
                            <code>{{ header }}</code>
                            <code v-if="body.schema && body.schema.type">
                                {{ body.schema.type }}<span v-if="body.schema.format">&lt;{{ body.schema.format }}&gt;</span>
                            </code>
                        </div>
                        <div v-html="render(body.description)" v-if="body.description" />
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.route {
    > .heading {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 0 -.5rem 1rem;

        h2 {
            font-weight: $weight-bold;
            font-size: 3rem;
            margin: 0 .5rem;

            @media (min-width: $tablet) {
                font-size: 4rem;
            }
        }

        p {
            font-size: 1rem;
            font-weight: $weight-bold;
            font-family: $font-mono;
            letter-spacing: .1px;
            margin: 1rem .5rem;
            padding: .25rem .75rem;
            border-radius: 1rem;
            background: rgba($brand, .75);
            color: $light;
            display: inline-block;
        }

        a {
            cursor: pointer;
            margin: 0 .5rem;

            svg {
                color: $light;
            }

            &:hover,
            &:focus {
                svg {
                    color: $brand;
                }
            }
        }
    }

    > .parameters {
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
        }
    }

    > .response {
        .heading {
            display: flex;
            align-items: center;
            margin: 1rem -.5rem;

            h4 {
                font-size: 1.75rem;
                font-weight: $weight-bold;
                font-family: $font-mono;
                letter-spacing: .1px;
                margin: 0 .5rem;
                padding: .125rem 1rem;
                border-radius: 2rem;
                background: rgba($brand, .75);
                color: $light;
                display: inline-block;
            }

            .description {
                margin: 0 .5rem;
            }
        }

        h5 {
            font-size: 1.75rem;
            margin: 1rem 0 0.25rem;
        }
    }

    .description::v-deep {
        p {
            &:last-child {
                margin: 0;
            }
        }
    }

    h3 {
        font-size: 2rem;
        margin: 2rem 0 1rem;

        small {
            font-size: 1rem;
            vertical-align: middle;
        }
    }

    .prop {
        display: flex;
        margin: 0 -.25rem;

        > code {
            font-size: 1rem;
            margin: 0 .25rem;

            &:nth-child(2) {
                color: $brand;
            }
        }
    }
}
</style>

<script>
import MarkdownIt from 'markdown-it';
import { faLink, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import FA from '../fa';
import RouteContent from './routeContent';
import RouteSchema from './routeSchema';
import sluggify from '../../util/sluggify';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export default {
    components: {
        FA,
        RouteContent,
        RouteSchema,
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        route: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            visible: true,
            icons: {
                faLink,
                faEye,
                faEyeSlash,
            },
        };
    },
    computed: {
        parametersPath() {
            return this.data.parameters && this.data.parameters.filter(param => param.in === 'path');
        },
        parametersQuery() {
            return this.data.parameters && this.data.parameters.filter(param => param.in === 'query');
        },
    },
    methods: {
        toggleVisible() {
            this.visible = !this.visible;
        },
        render(text) {
            return md.render(text);
        },
        sluggify,
    },
};
</script>
