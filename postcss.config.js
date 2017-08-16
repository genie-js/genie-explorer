module.exports = {
  plugins: [
    require('postcss-cssnext')({
      features: {
        autoprefixer: false
      }
    }),
    require('cssnano')()
  ]
}
