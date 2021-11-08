// Load all features with webpack magic
export default () => (ctx => ctx.keys().map(ctx))(require.context('../data/data/features', true, /\.json$/));
