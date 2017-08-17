const html = require('choo/html')

module.exports = function slpView (state, emit) {
  const slp = state.fileData
  const renderer = state.slpFrameRenderer
  const frames = slp.frames
  const frameId = state.currentSlpFrame

  return html`
    <div class="pa2">
      <ul class="list pa0 fl">
        ${frames.map((frame, index) => FrameItem(frame, index, emit))}
      </ul>
      <div>
        ${renderer.render({
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
