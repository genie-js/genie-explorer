const html = require('choo/html')

module.exports = function paletteView (state, emit) {
  const palette = state.fileData
  const text = state.fileBuffer.toString('ascii')

  return html`
    <div style="display: flex; justify-content: space-between">
      <code><pre>${text}</pre></code>
      <div style="justify-self: flex-end">
        ${state.swatch.render(palette)}
      </div>
    </div>
  `
}
