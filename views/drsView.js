const html = require('choo/html')
const css = require('sheetify')
const prettyBytes = require('prettier-bytes')
const viewer = require('./fileView')

css('tachyons-flexbox')
css('tachyons-spacing')
css('tachyons-lists')
css('tachyons-font-family')
css('tachyons-skins')
css('tachyons-floats')

const prefix = css`
  :host > .file-list {
    flex-grow: 1;
    overflow-y: auto;
  }
  :host > .viewer {
    flex-grow: 2;
    overflow-y: auto;
  }
`

module.exports = function drsView (state, emit) {
  const files = state.drs.getFiles()
  return html`
    <div class="flex ${prefix}">
      <div class="file-list vh-100 pa2">
        <ul class="list pa0">
          ${files.map((file) => FileView(file, emit))}
        </ul>
      </div>
      <div class="viewer vh-100 pa2">
        ${state.viewing ? viewer(state, emit) : null}
      </div>
    </div>
  `
}

function FileView (file, emit) {
  return html`
    <li onclick=${onclick} class="code">
      ${file.id}.${file.type}
      <span class="mid-gray fr">${prettyBytes(file.size)}</span>
    </li>
  `

  function onclick () {
    emit('view', file.id)
  }
}
