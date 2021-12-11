// Load all libraries with webpack magic
export default () => (ctx => ctx.keys().map(ctx))(require.context('../data/data/libraries', true, /\.json$/));
