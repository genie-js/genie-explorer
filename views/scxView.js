const html = require('nanohtml')
const Minimap = require('../components/minimap')

const minimap = new Minimap()

module.exports = function scxView (state, emit) {
  const scx = state.fileData
  if (!scx) {
    return html`<div />`
  }

  return html`
    <div>
      <div class="flex justify-between items-start">
        <div class="bg-white pa3 ma2 shadow-2">
          <h2 class="code ma0 mb2 tc">${scx.header.filename}</h2>
          ${minimap.render(scx.map)}
        </div>
      </div>
    </div>
  `
}
