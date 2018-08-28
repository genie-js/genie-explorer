const fs = require('fs')
const isBmp = require('is-bmp')
const DRS = require('genie-drs')
const Palette = require('jascpal')
const SLP = require('genie-slp')

const defaultPalette = fs.readFileSync(require.resolve('./default-palette.pal'), 'utf8')

module.exports = (state, emitter) => {
  state.drs = null
  state.viewing = null
  state.palette = Palette(defaultPalette)
  state.palette.id = 50500
  state.slpPlayer = 1

  emitter.on('pushState', (route) => {
    window.location.hash = route
  })
  window.addEventListener('hashchange', (event) => {
    if (/#palette$/.test(event.newURL)) {
      return emitter.emit('viewPalette', state.palette)
    }

    const match = /#([a-z]+)\/(\d+)$/.exec(event.newURL)
    if (match) {
      return emitter.emit('view', parseInt(match[2], 10))
    }

    state.viewing = null
    state.fileBuffer = null
    state.fileType = null
    state.fileData = null
    state.fileURL = null
  })

  emitter.on('drsFile', (drs) => {
    state.file = drs
    state.drs = DRS(drs)
    state.tableStates = Object.create(null)

    state.drs.read(() => {
      emitter.emit('render')
    })
  })

  emitter.on('usePalette', (palette) => {
    state.palette = palette
    emitter.emit('render')
  })

  emitter.on('slpFrame', (id) => {
    if (!(state.fileData instanceof SLP)) {
      return
    }
    state.currentSlpFrame = id
    emitter.emit('render')
  })
  emitter.on('slpPlayer', (player) => {
    state.slpPlayer = player
    emitter.emit('render')
  })

  emitter.on('collapseDrsTable', ({ table, value }) => {
    state.tableStates[table] = value
    emitter.emit('render')
  })

  emitter.on('view', (id) => {
    const file = state.drs.getFile(id)
    if (state.viewing === file) {
      return
    }

    state.viewing = file
    // Reset
    state.fileBuffer = null
    state.fileType = null
    state.fileData = null
    state.fileURL = null

    state.drs.readFile(id, (err, buffer) => {
      if (err) throw err
      if (state.viewing !== file) return

      state.fileBuffer = buffer
      if (file.type === 'bina') {
        if (isBmp(buffer)) {
          state.fileType = 'bmp'
          const blob = new Blob([ buffer.buffer ], { type: 'image/bmp' })
          state.fileData = URL.createObjectURL(blob)
          state.fileURL = state.fileData
        } else if (isPalette(buffer)) {
          state.fileType = 'palette'
          state.fileData = Palette(buffer)
          state.fileData.id = id
        } else if (isRandomMapScript(buffer)) {
          state.fileType = 'rms'
        } else if (isAIScript(buffer)) {
          state.fileType = 'ai'
        } else {
          state.fileType = 'text'
        }

        if (state.fileType !== 'bmp') {
          const blob = new Blob([ buffer.buffer ], { type: 'text/plain' })
          state.fileURL = URL.createObjectURL(blob)
        }
      } else if (file.type === 'slp ') {
        state.fileType = 'slp'
        const blob = new Blob([ buffer.buffer ], { type: 'application/octet-stream' })
        state.fileURL = URL.createObjectURL(blob)
        state.fileData = SLP(buffer)
        state.fileData.parseHeader()
        state.currentSlpFrame = 0
      } else if (file.type === 'wav ') {
        state.fileType = 'wav'
        const blob = new Blob([ buffer.buffer ], { type: 'audio/wav' })
        state.fileURL = URL.createObjectURL(blob)
        state.fileData = new Audio(state.fileURL)
      }

      emitter.emit('render')
    })

    emitter.emit('render')
  })

  emitter.on('viewPalette', (palette) => {
    const source = palette.toString()
    state.viewing = {
      id: palette.id,
      type: 'bina',
      size: source.length,
      offset: -1
    }
    const blob = new Blob([ source ], { type: 'text/plain' })
    state.fileURL = URL.createObjectURL(blob)
    state.fileType = 'palette'
    state.fileBuffer = Buffer.from(source, 'ascii')
    state.fileData = palette

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
