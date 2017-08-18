const html = require('choo/html')
const paletteView = require('./paletteView')
const wavView = require('./wavView')
const imageView = require('./imageView')
const scriptView = require('./scriptView')
const slpView = require('./slpView')

module.exports = function fileView (state, emit) {
  const type = state.fileType
  let view

  if (type === 'palette') {
    view = paletteView(state, emit)
  }
  if (type === 'bmp') {
    view = imageView(state, emit)
  }
  if (type === 'wav') {
    view = wavView(state, emit)
  }
  if (type === 'rms' || type === 'ai' || type === 'text') {
    view = scriptView(state, emit)
  }
  if (type === 'slp') {
    view = slpView(state, emit)
  }

  if (!view) {
    view = JSON.stringify(state.viewing)
  }

  return html`
    <div>
      ${view}
    </div>
  `
}
