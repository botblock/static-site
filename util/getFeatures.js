// Load all features with webpack magic
export default () => (ctx => ctx.keys().map(ctx))(require.context('../vendor/data/data/features', true, /\.json$/));
