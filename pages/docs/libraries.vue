<template>
    <div>
        <div class="hero">
            <Nav dark />
            <div class="container">
                <h1>API Libraries</h1>
                <p>Libraries developed by the community that interact with the BotBlock API</p>
            </div>
        </div>
        <div class="libraries">
            <div class="container">
                <Library :library="library" class="library" v-for="library in librariesOne" :key="library.repo" />
            </div>
        </div>
        <ApiCta v-if="showCta" />
        <div class="libraries">
            <div class="container">
                <Library :library="library" class="library" v-for="library in librariesTwo" :key="library.repo" />
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

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

.library {
    padding: 1rem 0;

    &:not(:last-child) {
        margin: 0 0 1rem;
        border-bottom: 1px solid $brand;
    }
}

.footer {
    margin: 2rem 0 0;
}
</style>

<script>
import { faAngleUp, faMinus, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../components/nav';
import Library from '../../components/docs/library';
import ApiCta from '../../components/cta/apiCta';
import Footer from '../../components/footer';
import FA from '../../components/fa';
import getLibraries from '../../util/getLibraries';

export default {
    components: {
        Nav,
        Library,
        ApiCta,
        Footer,
        FA,
    },
    computed: {
        librariesHalf() {
            return Math.ceil(this.libraries.length / 2);
        },
        librariesOne() {
            return this.libraries.slice(0, this.librariesHalf);
        },
        librariesTwo() {
            return this.libraries.slice(this.librariesHalf);
        },
        showCta() {
            return this.libraries.length >= 3;
        },
    },
    data() {
        return {
            libraries: getLibraries().sort((a, b) => {
                if (a.language === b.language) return a.repo.localeCompare(b.repo) > 0 ? 1 : -1;
                return a.language.localeCompare(b.language) > 0 ? 1 : -1;
            }),
            icons: {
                faAngleUp,
                faMinus,
                faAngleDown,
                faAngleRight,
            },
        };
    },
};
</script>