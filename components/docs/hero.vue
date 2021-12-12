<template>
    <div class="hero">
        <Nav dark />
        <div class="container">
            <div class="headline">
                <h1>BotBlock API</h1>
                <p>A single POST to send your bot's guild count</p>
            </div>
            <div class="terminal">
                <div>
                    <code
                        tabindex="-1"
                        v-text="demo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../scss/globals';
@import '../../scss/mixins';

$padding-top: 4rem;
$padding-bottom: 1rem;
$triangle-height: 5rem;

.hero {
    @include triangleAfter($triangle-height);

    background: $brand;
    color: $dark;
    margin: 0 0 $triangle-height;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0 $padding-bottom;
        position: relative;

        @media (min-width: $tablet) {
            flex-wrap: nowrap;
            padding: $padding-top 0 $padding-bottom;
        }

        .headline {
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

        .terminal {
            position: relative;
            max-width: 100%;

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: .5rem;
                width: calc(100% - 2px);
                left: 1px;
                border-width: 0 1px;
                border-style: dashed;
                border-spacing: 6px;
                border-color: rgba($dark, .2);
                height: calc(100% + #{$triangle-height + $padding-bottom});
                pointer-events: none;
            }

            @media (min-width: $tablet) {
                margin: 0 1rem;

                &::before {
                    content: '';
                    display: block;
                    background: linear-gradient(to bottom, rgba($brand, 1) 0%, rgba($brand, 0) 100%);
                    width: 100%;
                    height: $padding-top * .75;
                    position: absolute;
                    top: -$padding-top;
                    z-index: 1;
                    pointer-events: none;
                }

                &::after {
                    top: -$padding-top;
                    height: calc(100% + #{$padding-top + $triangle-height + $padding-bottom});
                }
            }

            div {
                background: mix($dark, $brand, 90%);
                border: 1px solid mix($dark, $brand, 80%);
                color: $light;
                padding: 1rem 1rem 1rem calc(1rem + 2ch);
                border-radius: .5rem;
                overflow-x: auto;
                max-width: 100%;

                code {
                    white-space: pre;
                    background: none;
                    border: none;
                    padding: 0;
                    border-radius: 0;
                    display: block;
                    position: relative;

                    &::before {
                        content: '$';
                        position: relative;
                        margin: 0 .5ch 0 -1.5ch;
                        font-size: 1rem;
                        color: rgba($light, .9);
                    }

                    &::after {
                        content: "";
                        width: 1ch;
                        height: 2ch;
                        border: 1px solid rgba($light, .75);
                        display: inline-block;
                        vertical-align: text-bottom;
                        margin: 0 0 0 .5ch;
                    }

                    &:hover,
                    &:focus {
                        outline: none;

                        &::after {
                            border-width: 0 0 1px 0;
                            border-color: $light;
                            animation: 1s blink step-end infinite;

                            @keyframes blink {
                                0%,
                                100% {
                                    opacity: 1;
                                }
                                50% {
                                    opacity: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
import Nav from '../nav';

const demo = `
curl -X POST https://botblock.org/api/count \\
-H 'Content-Type: text/json' \\
--data-raw '
{
    "server_count": 10000,
    "bot_id": "123456789123456789",
    "discordbotlist.com": "abcDEFghi.JKLmnoPQR.stuVWXyz1",
    "discord.bots.gg": "abcDEFghi.JKLmnoPQR.stuVWXyz1"
}'
`.trim();

export default {
    components: {
        Nav,
    },
    data() {
        return {
            demo,
        };
    },
};
</script>
