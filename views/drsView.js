const html = require('choo/html')
const viewer = require('./fileView')

module.exports = function drsView (state, emit) {
  const files = state.drs.getFiles()
  return html`
    <div style="display: flex">
      <ul style="flex-grow: 1">
        ${files.map((file) => FileView(file, emit))}
      </ul>
      <div style="flex-grow: 2">
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
