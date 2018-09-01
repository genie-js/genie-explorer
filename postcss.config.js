module.exports = {
  plugins: [
    require('postcss-preset-env')({
      features: {
        'custom-media-queries': true
      }
    }),
    require('cssnano')()
  ]
}
