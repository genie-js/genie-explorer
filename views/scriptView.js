const html = require('choo/html')
const ScriptRenderer = require('../components/script')

const renderer = new ScriptRenderer()

module.exports = function scriptView (state, emit) {
  const content = renderer.render({
    source: state.fileBuffer.toString('utf8'),
    language: state.fileType
  })

  return html`
    <div>
      ${content}
    </div>
  `
}
