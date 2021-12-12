// Load all lists with webpack magic
export default () => (ctx => ctx.keys().map(ctx))(require.context('../vendor/data/data/lists', true, /\.json$/));
