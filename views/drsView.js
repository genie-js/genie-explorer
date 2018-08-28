const html = require('nanohtml')
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
        <h1 class="ma0 mb2 f5 b">genie explorer</h1>

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

        <hr class="bb bw1">

        <p class="ma0 mb2 code">
          genie-explorer is available under the <a href="https://github.com/goto-bus-stop/genie-explorer/tree/default/LICENSE.md" target="_blank">GPLv3 license</a>.
        </p>
        <p class="ma0 mb2 code">
          source: <a href="https://github.com/goto-bus-stop/genie-explorer" target="_blank">github</a>
        </p>
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
