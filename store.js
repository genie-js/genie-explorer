const DRS = require('genie-drs')
const Palette = require('jascpal')
const SLP = require('genie-slp')
const Swatch = require('./components/swatch')

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

    state.drs.readFile(id, (err, buffer) => {
      if (state.viewing !== file) return

      state.fileBuffer = buffer
      if (file.type === 'bina' && buffer.toString('ascii', 0, 8) === 'JASC-PAL') {
        state.fileType = 'palette'
        state.fileData = Palette(buffer)
        state.swatch = new Swatch()
      } else if (file.type === 'slp') {
        state.fileType = 'slp'
        state.fileData = SLP(buffer)
      } else if (file.type === 'wav') {
        state.fileType = 'wav'
      }

      emitter.emit('render')
    })

    emitter.emit('render')
  })
}
