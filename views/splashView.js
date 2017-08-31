const html = require('choo/html')

module.exports = function splashView (state, emit) {
  return html`
    <div class="flex justify-center items-center vw-100 vh-100 bg-light-gray">
      <div class="pa4 bg-white shadow-2">
        <p>Select a file</p>
        <input type="file" onchange=${onchange} />
      </div>
    </div>
  `

  function onchange (event) {
    emit('drsFile', event.target.files[0])
  }
}
