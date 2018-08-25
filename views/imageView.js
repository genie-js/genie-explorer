const html = require('nanohtml')

module.exports = function imageView (state, emit) {
  return html`
    <div class="flex align-center justify-center">
      <img src="${state.fileData}" alt="" />
    </div>
  `
}
