const html = require('nanohtml')
const paletteView = require('./paletteView')
const wavView = require('./wavView')
const imageView = require('./imageView')
const scriptView = require('./scriptView')
const interfaceView = require('./interfaceView')
const slpView = require('./slpView')
const scxView = require('./scxView')

module.exports = function fileView (state, emit) {
  const type = state.fileType

  if (type === 'palette') {
    return fileWrapper(state, emit, paletteView)
  }
  if (type === 'bmp') {
    return fileWrapper(state, emit, imageView)
  }
  if (type === 'wav') {
    return fileWrapper(state, emit, wavView)
  }
  if (type === 'interface') {
    return fileWrapper(state, emit, interfaceView)
  }
  if (type === 'rms' || type === 'ai' || type === 'text') {
    return fileWrapper(state, emit, scriptView)
  }
  if (type === 'slp') {
    return fileWrapper(state, emit, slpView)
  }
  if (type === 'scx') {
    return fileWrapper(state, emit, scxView)
  }

  return fileWrapper(state, emit, () => html`
    <div>
      ${JSON.stringify(state.viewing)}
    </div>
  `)
}

function fileWrapper (state, emit, view) {
  return html`
    <div class="flex flex-column h-100">
      <div class="code w-100 pa2">
        <strong>
          ${state.viewing.id}.${state.viewing.type}
        </strong>
        <div style="float: right">
          ${activePalette(state, emit)}

          <a href="${state.fileURL}"
            download="${state.viewing.id}.${state.viewing.type}">
            ⬇️ download
          </a>
        </div>
      </div>
      <div class="self-stretch w-100 overflow-y-auto">
        ${view(state, emit)}
      </div>
    </div>
  `
}

function activePalette (state) {
  return html`
    <span class="mr2">
      palette: <a href="#palette">${state.palette.id}</a>
    </span>
  `
}
