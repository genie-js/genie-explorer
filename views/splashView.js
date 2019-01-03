const html = require('nanohtml')

module.exports = function splashView (state, emit) {
  return html`
    <div class="flex flex-column justify-center items-center vw-100 vh-100 bg-light-gray">
      <h1>genie explorer</h1>

      <div class="pa4 bg-white shadow-2" style="max-width: 700px">
        <p>
          genie explorer is a web based tool to view Age of Empires .drs file contents.
        </p>

        ${location.protocol === 'file:' ? null : html`
          <p>
            It is a single HTML file, so you can store it on your computer using right-click » "Save this Page" and open the HTML file in your browser to use it offline, or you can <a href="${location.href}" download="genie-explorer.html">click here</a> to download it.
          </p>
        `}

        <p>
          genie-explorer is built on various open source tools, and is itself licensed under the <a href="https://github.com/goto-bus-stop/genie-explorer/tree/default/LICENSE.md" target="_blank">GPLv3</a>.
          See its Github page: <a href="https://github.com/goto-bus-stop/genie-explorer" target="_blank">goto-bus-stop/genie-explorer</a>.
        </p>

        <p>Select a .drs file:</p>
        <input type="file" accept=".drs" onchange=${onchange} />
      </div>
    </div>
  `

  function onchange (event) {
    emit('drsFile', event.target.files[0])
  }
}
