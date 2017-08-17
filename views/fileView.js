const html = require('choo/html')
const paletteView = require('./paletteView')
const wavView = require('./wavView')
const rmsView = require('./rmsView')
const slpView = require('./slpView')

module.exports = function fileView (state, emit) {
  const type = state.fileType
  let view

  if (type === 'palette') {
    view = paletteView(state, emit)
  }
  if (type === 'wav') {
    view = wavView(state, emit)
  }
  // TODO separate these two if/when they get different functionality
  if (type === 'rms' || type === 'ai') {
    view = rmsView(state, emit)
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
