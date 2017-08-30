const html = require('choo/html')
const SLPFrameRenderer = require('../components/slpFrameViewer')

const frameRenderer = new SLPFrameRenderer()

module.exports = function slpView (state, emit) {
  const slp = state.fileData
  const frames = slp.frames
  const frameId = state.currentSlpFrame

  return html`
    <div class="pa2">
      <div>
        ${PlayerSelect({
          current: state.slpPlayer,
          onchange: onplayerchange
        })}
        <ul class="list pa0 fl">
          ${frames.map((frame, index) => FrameItem(frame, index, emit))}
        </ul>
      </div>
      <div>
        ${frameRenderer.render({
          slp,
          frameId,
          palette: state.palette,
          player: state.slpPlayer
        })}
      </div>
    </div>
  `

  function onplayerchange (player) {
    emit('slpPlayer', player)
  }
}

function PlayerSelect ({ current, onchange }) {
  const options = []
  for (let i = 1; i <= 8; i++) {
    options.push(html`
      <option selected=${current === i}>${i}</option>
    `)
  }

  return html`
    <select onchange=${onplayerchange}>
      ${options}
    </select>
  `

  function onplayerchange (event) {
    onchange(event.target.selectedIndex + 1)
  }
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
