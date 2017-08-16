const html = require('choo/html')
const paletteView = require('./paletteView')
const wavView = require('./wavView')
const rmsView = require('./rmsView')

module.exports = function fileView (state, emit) {
  const type = state.fileType
  let view

  if (type === 'palette') {
    view = paletteView(state, emit)
  }
  if (type === 'wav') {
    view = wavView(state, emit)
  }
  if (type === 'rms') {
    view = rmsView(state, emit)
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
