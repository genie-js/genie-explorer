const html = require('choo/html')
const css = require('sheetify')
const FileList = require('../components/fileList')
const CurrentFile = require('../components/currentFile')
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
const currentFile = new CurrentFile()

module.exports = function drsView (state, emit) {
  return html`
    <div class="${prefix}">
      <div class="file-list fl vh-100 pa2 w5">
        ${currentFile.render({
          onselect: onchange,
          file: state.file
        })}
        ${fileList.render({
          drs: state.drs,
          tableStates: state.tableStates,
          selected: state.viewing && state.viewing.id,
          emit
        })}
      </div>
      <div class="viewer vh-100 bg-light-gray">
        ${state.viewing ? viewer(state, emit) : empty()}
      </div>
    </div>
  `

  function onchange (file) {
    emit('drsFile', file)
  }
}

function empty () {
  return html`
    <p class="pa2 ma0">
      Select a file to the left
    </p>
  `
}
