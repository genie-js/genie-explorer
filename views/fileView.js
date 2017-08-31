const html = require('choo/html')
const paletteView = require('./paletteView')
const wavView = require('./wavView')
const imageView = require('./imageView')
const scriptView = require('./scriptView')
const slpView = require('./slpView')

module.exports = function fileView (state, emit) {
  const type = state.fileType

  if (type === 'palette') {
    return paletteView(state, emit)
  }
  if (type === 'bmp') {
    return imageView(state, emit)
  }
  if (type === 'wav') {
    return wavView(state, emit)
  }
  if (type === 'rms' || type === 'ai' || type === 'text') {
    return scriptView(state, emit)
  }
  if (type === 'slp') {
    return slpView(state, emit)
  }

  return html`
    <div>
      ${JSON.stringify(state.viewing)}
    </div>
  `
}
