const html = require('choo/html')

module.exports = function rmsView (state, emit) {
  return html`
    <div>
      ${state.scriptRenderer.render(state.fileBuffer.toString('utf8'))}
    </div>
  `
}
