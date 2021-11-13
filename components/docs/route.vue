<template>
    <div class="route" :id="sluggify(route)">
        <div class="heading">
            <h2>{{ data.summary }}</h2>
            <p>{{ route }}</p>
        </div>

        <div class="description" v-html="render(data.description)" v-if="data.description" />

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
            <h4>{{ status }}</h4>
            <div v-for="(body, type) in response.content" :key="type">
                <RouteContent :type="type" :data="body" level="h5" />
            </div>

            <template v-if="response.headers">
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
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.route {
    .heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 1rem;

        h2 {
            font-weight: $weight-bold;
            font-size: 4rem;
            margin: 0;
        }

        p {
            font-size: 1rem;
            font-weight: $weight-bold;
            font-family: $font-mono;
            letter-spacing: .1px;
            margin: 1rem;
            padding: .25rem .75rem;
            border-radius: 1rem;
            background: rgba($brand, .75);
            color: $light;
            display: inline-block;
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

    .response {
        h4 {
            font-size: 1.75rem;
            font-weight: $weight-bold;
            font-family: $font-mono;
            letter-spacing: .1px;
            margin: 1rem 0;
            padding: .125rem 1rem;
            border-radius: 2rem;
            background: rgba($brand, .75);
            color: $light;
            display: inline-block;
        }

        h5 {
            font-size: 1.75rem;
            margin: 1rem 0 0.25rem;
        }

        .header {
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
}
</style>

<script>
import MarkdownIt from 'markdown-it';
import RouteContent from './route-content';
import RouteSchema from './route-schema';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export default {
    components: {
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
    methods: {
        render(text) {
            return md.render(text);
        },
        sluggify(text) {
            return `${text}`.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
        },
    },
};
</script>
