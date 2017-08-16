const html = require('choo/html')
const css = require('sheetify')
const viewer = require('./fileView')

css('tachyons-flexbox')
css('tachyons-lists')

const prefix = css`
  :host > .file-list {
    flex-grow: 1;
    overflow-y: auto;
    height: 100vh;
  }
  :host > .viewer {
    flex-grow: 2;
    height: 100vh;
  }
`

module.exports = function drsView (state, emit) {
  const files = state.drs.getFiles()
  return html`
    <div class="flex ${prefix}">
      <div class="file-list">
        <ul class="list">
          ${files.map((file) => FileView(file, emit))}
        </ul>
      </div>
      <div class="viewer">
        ${state.viewing ? viewer(state, emit) : null}
      </div>
    </div>
  `
}

function FileView (file, emit) {
  return html`
    <li onclick=${onclick}>
      ${file.id}.${file.type}
    </li>
  `

  function onclick () {
    emit('view', file.id)
  }
}
