<template>
    <div class="library" :id="sluggify(library.repo)">
        <div class="heading">
            <h2>
                <small>{{ library.language }} - </small>
                {{ library.name }}
            </h2>
            <div>
                <a class="repo" :href="`https://github.com/${library.repo}`" target="_blank">
                    {{ library.repo }}
                </a>
                <a :href="`#${sluggify(library.repo)}`">
                    <FA :icon="icons.faLink" />
                </a>
                <a @click.prevent="toggleVisible">
                    <FA :icon="visible ? icons.faEye : icons.faEyeSlash" />
                </a>
            </div>
        </div>

        <div class="info" v-if="visible">
            <div class="links">
                <div v-if="library.badge_image">
                    <a :href="library.badge_url" v-if="library.badge_url">
                        <img :src="library.badge_image" alt="" />
                    </a>
                    <img :src="library.badge_image" alt="" v-else />
                </div>

                <a :href="library.package_link" target="_blank">
                    View on {{ library.package_link_name }}
                    <FA :icon="icons.faExternalLinkAlt" />
                </a>
                <a :href="`https://github.com/${library.repo}`" target="_blank">
                    View on GitHub
                    <FA :icon="icons.faExternalLinkAlt" />
                </a>
            </div>
            <div>
                <div class="description" v-html="render(library.description)" />

                <div class="example" v-if="library.example_usage">
                    <h3>Example Usage</h3>
                    <PrismHighlight :language="languageLoaded ? language : 'text'" :code="library.example_usage" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';

.library {
    .heading {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 0 -.5rem 1rem;

        h2 {
            font-weight: $weight-bold;
            font-size: 3rem;
            margin: 0 .5rem;
            overflow-wrap: anywhere;

            @media (min-width: $tablet) {
                font-size: 4rem;
            }
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

            &.repo {
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
                text-decoration: none;

                &:hover,
                &:focus {
                    background: rgba($brand, 1);
                }
            }
        }
    }

    .info {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -.5rem;

        > div {
            flex-basis: calc(100% - 1rem);
            width: calc(100% - 1rem);
            margin: 0 .5rem;

            @media (min-width: $tablet) {
                &:nth-child(1) {
                    flex-basis: calc(25% - 1rem);
                    width: calc(25% - 1rem);
                }

                &:nth-child(2) {
                    flex-basis: calc(75% - 1rem);
                    width: calc(75% - 1rem);
                }
            }
        }

        .links {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 0 .5rem 1rem;

            > * {
                margin: .5rem 0;
            }

            > div {
                a {
                    line-height: 1;
                    display: inline-block;

                    img {
                        vertical-align: bottom;
                    }
                }

                img {
                    height: 1.5rem;
                    border-radius: .75rem;
                }
            }

            > a {
                justify-self: center;
                padding: .125rem 1rem;
                border-radius: 1rem;
                background: $brand;
                color: $light;
                text-decoration: none;
                font-size: 1rem;

                &:hover,
                &:focus {
                    background: rgba($brand, .75);
                }

                > svg {
                    font-size: .75rem;
                    vertical-align: baseline;
                    margin: 0 0 0 .5rem;
                }
            }
        }

        .description::v-deep {
            p {
                &:last-child {
                    margin: 0;
                }
            }
        }

        .example {
            margin: 2rem 0 0;

            h3 {
                font-size: 2rem;
                margin: 0 0 1rem;
            }

            pre {
                background: mix($dark, $brand, 90%);
                border: 1px solid mix($dark, $brand, 80%);

                code {
                    background: none;
                    border: none;
                    padding: 0;
                    border-radius: 0;
                }
            }
        }
    }
}
</style>

<script>
import 'prismjs/themes/prism-okaidia.css';

import Prism from 'prismjs';
import MarkdownIt from 'markdown-it';
import { faEye, faEyeSlash, faLink, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PrismHighlight from 'vue-prism-component';
import FA from '../fa';
import sluggify from '../../util/sluggify';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

const languageMap = Object.freeze({
    'C#': 'csharp',
});

export default {
    components: {
        PrismHighlight,
        FA,
    },
    props: {
        library: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            visible: true,
            languageLoaded: false,
            icons: {
                faLink,
                faEye,
                faEyeSlash,
                faExternalLinkAlt,
            },
        };
    },
    beforeMount() {
        this.loadLanguage();
    },
    computed: {
        language () {
            return languageMap[this.library.language] || this.library.language.toLowerCase();
        },
    },
    watch: {
        language() {
            this.loadLanguage();
        },
    },
    methods: {
        toggleVisible() {
            this.visible = !this.visible;
        },
        render(text) {
            return md.render(text);
        },
        async loadLanguage() {
            if (!(this.language in Prism.languages)) {
                this.languageLoaded = false;
                await import(`prismjs/components/prism-${this.language}`);
            }
            this.languageLoaded = true;
        },
        sluggify,
    },
};
</script>
