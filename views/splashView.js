const html = require('choo/html')

module.exports = function splashView (state, emit) {
  return html`
    <div class="">
      <p>Select a file</p>
      <input type="file" onchange=${onchange}>
    </div>
  `

  function onchange (event) {
    emit('drsFile', event.target.files[0])
  }
}
