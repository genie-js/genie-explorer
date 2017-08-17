const html = require('choo/html')
const css = require('sheetify')
const FileList = require('../components/fileList')
const viewer = require('./fileView')

const prefix = css`
  :host > .file-list {
    overflow-y: auto;
  }
  :host > .viewer {
    overflow-y: auto;
  }
`

const fileList = new FileList()

module.exports = function drsView (state, emit) {
  const files = state.drs.getFiles()
  return html`
    <div class="${prefix}">
      <div class="file-list fl vh-100 pa2 w5">
        <input type="file" onchange=${onchange} class="w-100" />
        ${fileList.render({ files, emit })}
      </div>
      <div class="viewer vh-100">
        ${state.viewing ? viewer(state, emit) : empty()}
      </div>
    </div>
  `

  function onchange (event) {
    emit('drsFile', event.target.files[0])
  }
}

function empty () {
  return html`
    <p class="pa2 ma0">
      Select a file to the left
    </p>
  `
}
