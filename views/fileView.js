const html = require('choo/html')
const paletteView = require('./paletteView')

module.exports = function fileView (state, emit) {
  const type = state.fileType
  let view

  if (type === 'palette') {
    view = paletteView(state, emit)
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
