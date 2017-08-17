const html = require('choo/html')

module.exports = function paletteView (state, emit) {
  const palette = state.fileData
  const text = state.fileBuffer.toString('ascii')

  return html`
    <div class="pa2">
      <button onclick=${usePalette}>Use this palette</button>
      <div class="flex justify-between">
        <code><pre>${text}</pre></code>
        <div style="justify-self: flex-end">
          ${state.swatch.render(palette)}
        </div>
      </div>
    </div>
  `

  function usePalette () {
    emit('usePalette', palette)
  }
}
