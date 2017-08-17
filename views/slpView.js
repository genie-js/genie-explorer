const html = require('choo/html')
const SLPFrameRenderer = require('../components/slpFrameViewer')

const frameRenderer = new SLPFrameRenderer()

module.exports = function slpView (state, emit) {
  const slp = state.fileData
  const frames = slp.frames
  const frameId = state.currentSlpFrame

  return html`
    <div class="pa2">
      <ul class="list pa0 fl">
        ${frames.map((frame, index) => FrameItem(frame, index, emit))}
      </ul>
      <div>
        ${frameRenderer.render({
          slp,
          frameId,
          palette: state.palette
        })}
      </div>
    </div>
  `
}

function FrameItem (frame, index, emit) {
  return html`
    <li class="fl mh2" onclick=${onclick}>
      #${index}
    </li>
  `

  function onclick () {
    emit('slpFrame', index)
  }
}
