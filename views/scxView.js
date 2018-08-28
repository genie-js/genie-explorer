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
      <div class="flex justify-start items-start">
        <div class="bg-white pa3 ma2 shadow-2">
          ${minimap.render(scx.map)}
        </div>
      </div>
    </div>
  `
}
