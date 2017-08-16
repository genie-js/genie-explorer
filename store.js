const DRS = require('genie-drs')
const Palette = require('jascpal')
const SLP = require('genie-slp')
const Swatch = require('./components/swatch')
const RmsScript = require('./components/rmsScript')
const AIScript = require('./components/aiScript')

module.exports = (state, emitter) => {
  state.drs = null
  state.viewing = null

  emitter.on('drsFile', (drs) => {
    state.drs = DRS(drs)

    state.drs.read(() => {
      emitter.emit('render')
    })
  })

  emitter.on('view', (id) => {
    const file = state.drs.getFile(id)
    state.viewing = file
    // Reset
    state.fileBuffer = null
    state.fileType = null
    state.fileData = null
    state.swatch = null

    state.drs.readFile(id, (err, buffer) => {
      if (state.viewing !== file) return

      state.fileBuffer = buffer
      if (file.type === 'bina') {
        if (isPalette(buffer)) {
          state.fileType = 'palette'
          state.fileData = Palette(buffer)
          state.swatch = new Swatch()
        } else if (isRandomMapScript(buffer)) {
          state.fileType = 'rms'
          state.scriptRenderer = new RmsScript()
        } else if (isAIScript(buffer)) {
          state.fileType = 'ai'
          state.scriptRenderer = new AIScript()
        }
      } else if (file.type === 'slp ') {
        state.fileType = 'slp'
        state.fileData = SLP(buffer)
      } else if (file.type === 'wav ') {
        state.fileType = 'wav'
        const blob = new Blob([ buffer.buffer ], { type: 'audio/wav' })
        state.fileData = URL.createObjectURL(blob)
      }

      emitter.emit('render')
    })

    emitter.emit('render')
  })
}

function isPalette (buffer) {
  return buffer.toString('ascii', 0, 8) === 'JASC-PAL'
}

function isRandomMapScript (buffer) {
  if (buffer.indexOf('<TERRAIN_GENERATION>') !== -1) {
    return true
  }
  if (buffer.indexOf('#const ') !== -1) {
    return true
  }
  return false
}

function isAIScript (buffer) {
  if (buffer.indexOf('(defrule') !== -1) {
    return true
  }
  if (buffer.indexOf('(defconst') !== -1) {
    return true
  }
  if (buffer.indexOf('#load-if-defined') !== -1) {
    return true
  }
  return false
}
