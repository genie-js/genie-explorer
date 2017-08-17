const html = require('choo/html')
const AIScript = require('../components/aiScript')
const RMSScript = require('../components/rmsScript')
const paletteView = require('./paletteView')
const wavView = require('./wavView')
const rmsView = require('./rmsView')
const slpView = require('./slpView')

const aiScriptRenderer = new AIScript()
const rmsRenderer = new RMSScript()

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
    view = rmsView(rmsRenderer, state, emit)
  }
  if (type === 'ai') {
    view = rmsView(aiScriptRenderer, state, emit)
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
