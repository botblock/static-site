<template>
    <div>
        <h2>Best practices</h2>
        <div v-html="render(practices)" />
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import practices from '../../vendor/discord-botlist-best-practices/README.md';

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export default {
    data() {
        return {
            practices,
        };
    },
    methods: {
        render(text) {
            return md.render(text);
        },
    },
};
</script>
