// Based on this config:
// https://github.com/gatsbyjs/gatsby/issues/2932#issuecomment-370858334

module.exports = require('babel-jest').createTransformer({
  presets: [
    // built-in
    [
      'env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
        exclude: ['transform-regenerator', 'transform-es2015-typeof-symbol'],
      },
    ],
    'stage-0',
    'react',
    // custom...
  ],
  plugins: [
    // built-in
    'gatsby/dist/utils/babel-plugin-extract-graphql',
    'add-module-exports',
    'transform-object-assign',
    // custom...
  ],
})
