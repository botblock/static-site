// Load all libraries with webpack magic
export default () => (ctx => ctx.keys().map(ctx))(require.context('../vendor/data/data/libraries', true, /\.json$/));
