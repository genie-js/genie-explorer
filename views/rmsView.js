const html = require('choo/html')

module.exports = function rmsView (scriptRenderer, state, emit) {
  return html`
    <div>
      ${scriptRenderer.render(state.fileBuffer.toString('utf8'))}
    </div>
  `
}
