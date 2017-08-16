const html = require('choo/html')
const css = require('sheetify')

css('tachyons-flexbox')

module.exports = function wavView (state, emit) {
  return html`
    <div class="flex align-center justify-center">
      <div>
        <audio controls src=${state.fileData}></audio>
      </div>
    </div>
  `
}
