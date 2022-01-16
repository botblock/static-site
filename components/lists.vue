<template>
    <div>
        <div class="hero">
            <Nav dark />
            <div class="container">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>
            </div>
        </div>
        <div class="controls">
            <div class="container">
                <p>Sort:</p>
                <Select
                    ref="sortSelect"
                    v-model="sort"
                    :options="sortOptions"
                    :clearable="false"
                    @open="sortOpen"
                    @close="sortClose"
                />
            </div>
        </div>
        <div class="lists">
            <div class="container">
                <List
                    v-for="list in listsOne"
                    :key="list.id"
                    :list="list"
                />
            </div>
        </div>
        <ApiCta v-if="showCta" />
        <div class="lists">
            <div class="container">
                <List
                    v-for="list in listsTwo"
                    :key="list.id"
                    :list="list"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../scss/globals';
@import '../scss/mixins';

.hero {
    background: $brand;
    color: $dark;
    margin: 0 0 2rem;

    .container {
        padding: 2rem 0;

        h1 {
            margin: 0 0 .5rem;
        }

        p {
            position: relative;
            font-size: 1.25rem;
            line-height: 1.25;
            font-weight: $weight-bold;
            padding: 0 0 0 1.5rem;

            &::before {
                content: '';
                display: block;
                position: absolute;
                height: 100%;
                width: .125rem;
                background: rgba($dark, .25);
                left: .5rem;
            }
        }
    }
}

.controls {
    &::v-deep {
        $vs-colors: (
            lightest: rgba($light, .75), // Border
            light: $light, // Controls
            dark: $light, // Selected
            darkest: #000, // Shadow (unused)
        );
        $vs-state-active-bg: $brand;
        $vs-dropdown-bg: $dark;
        $vs-dropdown-box-shadow: none;

        @import 'vue-select/src/scss/vue-select.scss';

        .v-select {
            &.vs--single {
                &.vs--open {
                    .vs__selected {
                        position: unset; // Absolute positioning causes sizing issues
                    }
                }

                .vs__dropdown-option {
                    color: $light; // Not defined by a variable
                }

                .vs__search {
                    display: none; // We don't enable search
                }

                .vs__dropdown-menu {
                    min-width: unset; // No fixed width to avoid sizing mis-match
                    width: unset;
                }
            }
        }
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;

        p {
            margin: 0 .5em;
        }
    }
}

.lists {
    .container {
        display: flex;
        flex-wrap: wrap;

        .list {
            flex-basis: 100%;

            @media (min-width: $tablet) {
                flex-basis: 50%;
            }
        }
    }
}
</style>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'vue-select';
import Nav from './nav';
import ApiCta from './cta/apiCta';
import List from './list';

const sort = [
    {
        label: 'Alphabetical',
        code: 'alpha',
    },
    {
        label: 'Newest',
        code: 'added',
    },
];

export default {
    components: {
        Select,
        Nav,
        ApiCta,
        List,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        lists: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            sortOptions: sort,
            sort: sort[0],
            icons: {
                faAngleRight,
            },
        };
    },
    computed: {
        listsSorted() {
            return [...this.lists].sort((a, b) => {
                // Sort by newest
                if (this.sort.code === 'added' && a.added !== b.added) return a.added < b.added ? 1 : -1;

                // Alpha sort by default, and as fallback
                return a.id.localeCompare(b.id) > 0 ? 1 : -1;
            });
        },
        listsHalf() {
            return Math.ceil(this.lists.length / 4) * 2;
        },
        listsOne() {
            return this.listsSorted.slice(0, this.listsHalf);
        },
        listsTwo() {
            return this.listsSorted.slice(this.listsHalf);
        },
        showCta() {
            return this.lists.length >= 8;
        },
    },
    methods: {
        sortOpen() {
            this.$nextTick(() => {
                const max = Math.max(
                    this.$refs.sortSelect.$el.clientWidth,
                    this.$refs.sortSelect.$refs.dropdownMenu.clientWidth,
                );
                this.$refs.sortSelect.$refs.toggle.style.width = `${max}px`;
                this.$refs.sortSelect.$refs.dropdownMenu.style.width = `${max}px`;
            });
        },
        sortClose() {
            this.$refs.sortSelect.$refs.toggle.style.width = '';
        },
    },
};
</script>
