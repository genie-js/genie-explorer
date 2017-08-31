const html = require('choo/html')
const Frequency = require('../components/frequency')

const visualizer = new Frequency()

module.exports = function wavView (state, emit) {
  state.fileData.controls = true
  state.fileData.className = 'w-100'
  return html`
    <div class="flex items-center justify-center h-100">
      <div class="bg-white shadow-2 pa2">
        <div>
          ${visualizer.render({
            audio: state.fileData
          })}
        </div>
        <div>
          ${state.fileData}
        </div>
      </div>
    </div>
  `
}
