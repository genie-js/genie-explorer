const html = require('choo/html')
const css = require('sheetify')

css('tachyons-flexbox')
css('tachyons-spacing')

module.exports = function paletteView (state, emit) {
  const palette = state.fileData
  const text = state.fileBuffer.toString('ascii')

  return html`
    <div class="flex justify-between pa2">
      <code><pre>${text}</pre></code>
      <div style="justify-self: flex-end">
        ${state.swatch.render(palette)}
      </div>
    </div>
  `
}
