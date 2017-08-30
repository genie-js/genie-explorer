const html = require('choo/html')
const SLPFrameRenderer = require('../components/slpFrameViewer')

const frameRenderer = new SLPFrameRenderer()

module.exports = function slpView (state, emit) {
  const slp = state.fileData
  const frames = slp.frames
  const frameId = state.currentSlpFrame

  return html`
    <div>
      <table class="bg-light-gray w-100 ph2">
        <tbody>
          <tr>
            <th class="tl w4">Player:</th>
            <td>
              ${PlayerSelect({
                current: state.slpPlayer,
                onchange: onplayerchange
              })}
            </td>
          </tr>
          <tr>
            <th class="tl w4">Frame:</th>
            <td>
              ${FrameSlider({
                current: frameId,
                frames: frames,
                onchange: onframechange
              })}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pa2">
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
  function onframechange (index) {
    emit('slpFrame', index)
  }
}

function FrameSlider ({ current, frames, onchange }) {
  const frameOptions = []
  for (let i = 0; i < frames.length; i++) {
    frameOptions.push(html`
      <option selected=${current === i}>#${i}</option>
    `)
  }
  return html`
    <div class="mv0 flex content-start items-center">
      <select onchange=${onselect} class="mr2">
        ${frameOptions}
      </select>
      <span>#0</span>
      <input
        type="range"
        min="0"
        max=${frames.length - 1}
        value=${current}
        style="flex-grow: 2"
        oninput=${onrange} />
      <span>#${frames.length - 1}</span>
    </div>
  `

  function onselect (event) {
    onchange(event.target.selectedIndex)
  }
  function onrange (event) {
    onchange(parseInt(event.target.value, 10))
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
